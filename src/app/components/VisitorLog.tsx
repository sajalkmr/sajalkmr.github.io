'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { VisitorInfo, VisitorLogProps } from '../types/visitor';
import { supabase } from '../../lib/supabaseClient';



export const VisitorLog: React.FC<VisitorLogProps> = ({ 
  isDarkMode, 
  onVisitorCountChange
}) => {
  const [visitorLog, setVisitorLog] = useState<VisitorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [totalVisitors, setTotalVisitors] = useState(0);



  // Sound notification function
  const playNotificationSound = () => {
    if (typeof window !== 'undefined') {
      try {
        // Create a simple notification sound using Web Audio API
        const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      } catch (error) {
        console.log('Audio notification not supported:', error);
      }
    }
  };

  useEffect(() => {
    const getVisitorInfo = async () => {
      try {
        // Fallback to localStorage in case Supabase isn't configured
        const existingLog: VisitorInfo[] = JSON.parse(
          typeof window !== 'undefined' ? localStorage.getItem('visitorLog') || '[]' : '[]'
        );

        let locationData;
        try {
          const response = await axios.get('https://ipwho.is/', { 
            timeout: 8000,
            headers: {
              'Accept': 'application/json',
            }
          });
          
          if (response.data.success) {
            locationData = response.data;
          } else {
            throw new Error('IP API request failed');
          }
        } catch (ipError) {
          console.error('Error fetching IP data:', ipError);
          if (existingLog.length > 0) {
            setVisitorLog(existingLog);
            setTotalVisitors(existingLog.length);
            onVisitorCountChange?.(existingLog.length);
            setLoading(false);
            return;
          }
          throw ipError;
        }

        const visitorInfo: VisitorInfo = {
          ip: locationData.ip,
          country: locationData.country,
          city: locationData.city,
          region: locationData.region,
          timezone: locationData.timezone?.utc || locationData.timezone?.id || 'Unknown',
          os: navigator.userAgent.match(/Windows|Mac OS X|Linux|Android|iOS/)?.[0] || 'Unknown',
          browser: navigator.userAgent.match(/Chrome|Firefox|Safari|Edge|Opera/)?.[0] || 'Unknown',
          timestamp: Date.now(),
        };

        // Persist to Supabase if credentials are available, else fallback to localStorage
        if (supabase) {
          try {
            // Check if visitor already exists within last 30 minutes
            const thirtyMinutesAgo = new Date(Date.now() - 30 * 60 * 1000).toISOString();
            
            const { data: existingVisitor, error: selectError } = await supabase
              .from('visitors')
              .select('*')
              .eq('ip', visitorInfo.ip)
              .eq('browser', visitorInfo.browser)
              .eq('os', visitorInfo.os)
              .gte('timestamp', thirtyMinutesAgo)
              .single();

            if (selectError && selectError.code !== 'PGRST116') {
              // PGRST116 is "not found" error, which is expected for new visitors
              console.error('Supabase select error:', selectError);
            }

            const isNewVisitor = !existingVisitor;

            if (existingVisitor) {
              // Update existing visitor's timestamp instead of creating new entry
              await supabase
                .from('visitors')
                .update({ 
                  timestamp: new Date(visitorInfo.timestamp).toISOString(),
                  browser: visitorInfo.browser,
                  os: visitorInfo.os 
                })
                .eq('id', existingVisitor.id);
            } else {
              // Create new visitor entry
              await supabase.from('visitors').insert({
                ip: visitorInfo.ip,
                country: visitorInfo.country,
                city: visitorInfo.city,
                region: visitorInfo.region,
                timezone: visitorInfo.timezone,
                os: visitorInfo.os,
                browser: visitorInfo.browser,
                timestamp: new Date(visitorInfo.timestamp).toISOString(),
                lat: locationData.latitude,
                lon: locationData.longitude,
              });
              
              // Trigger notifications only for new visitors
              if (isNewVisitor) {
                playNotificationSound();
              }
            }
          } catch (dbErr) {
            console.error('Supabase operation error:', dbErr);
          }

          // Retrieve latest visitors from Supabase and deduplicate
          const { data: dbData, error: dbError } = await supabase
            .from('visitors')
            .select('*')
            .order('timestamp', { ascending: false })
            .limit(200); // Get more records to ensure we have enough after deduplication

          if (dbError) {
            console.error('Supabase fetch error:', dbError);
            setVisitorLog(existingLog);
            setTotalVisitors(existingLog.length);
            onVisitorCountChange?.(existingLog.length);
          } else {
            // Client-side deduplication: keep only the most recent entry for each IP+browser+OS combination
            const uniqueVisitors: VisitorInfo[] = [];
            const visitorKeys = new Set<string>();
            
            for (const visitor of dbData as VisitorInfo[]) {
              const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`;
              if (!visitorKeys.has(key)) {
                visitorKeys.add(key);
                uniqueVisitors.push(visitor);
              }
            }
            
            // Limit to 100 unique visitors
            const finalVisitors = uniqueVisitors.slice(0, 100);
            setVisitorLog(finalVisitors);
            setTotalVisitors(finalVisitors.length);
            
            // Notify parent of initial visitor count
            onVisitorCountChange?.(finalVisitors.length);
          }
        } else {
          // Check if visitor already exists in localStorage within last 30 minutes
          const thirtyMinutesAgo = Date.now() - 30 * 60 * 1000;
          const existingVisitorIndex = existingLog.findIndex(
            visitor => visitor.ip === visitorInfo.ip && 
                      visitor.browser === visitorInfo.browser &&
                      visitor.os === visitorInfo.os &&
                      visitor.timestamp > thirtyMinutesAgo
          );

          const isNewVisitor = existingVisitorIndex === -1;
          let updatedLog;
          
          if (existingVisitorIndex !== -1) {
            // Update existing visitor's timestamp
            updatedLog = [...existingLog];
            updatedLog[existingVisitorIndex] = {
              ...updatedLog[existingVisitorIndex],
              timestamp: visitorInfo.timestamp,
              browser: visitorInfo.browser,
              os: visitorInfo.os
            };
          } else {
            // Add new visitor
            updatedLog = [visitorInfo, ...existingLog].slice(0, 100);
          }
          
          localStorage.setItem('visitorLog', JSON.stringify(updatedLog));
          setVisitorLog(updatedLog);
          setTotalVisitors(updatedLog.length);
          
          // Notify parent of visitor count
          onVisitorCountChange?.(updatedLog.length);
          
          // Trigger notifications only for new visitors
          if (isNewVisitor) {
            playNotificationSound();
          }
        }
        setLoading(false);
      } catch (err) {
        console.error('Error in visitor logging:', err);
        try {
          const existingLog = JSON.parse(localStorage.getItem('visitorLog') || '[]');
          if (existingLog.length > 0) {
            setVisitorLog(existingLog);
            setTotalVisitors(existingLog.length);
            onVisitorCountChange?.(existingLog.length);
          } else {
            setError('Unable to load visitor data');
          }
        } catch {
          setError('Unable to load visitor data');
        }
        setLoading(false);
      }
    };

    getVisitorInfo();
  }, [onVisitorCountChange]);

  // Real-time updates for new visitors
  useEffect(() => {
    if (!supabase) return;

    const subscription = supabase
      .channel('visitors')
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'visitors' },
        (payload) => {
          const newVisitor = payload.new as VisitorInfo;
          
          setVisitorLog(prev => {
            // Check if this visitor already exists in our current list
            const existingIndex = prev.findIndex(v => 
              v.ip === newVisitor.ip && 
              v.browser === newVisitor.browser && 
              v.os === newVisitor.os
            );
            
            if (existingIndex !== -1) {
              // Update existing visitor (shouldn't happen with our new logic, but just in case)
              const updated = [...prev];
              updated[existingIndex] = newVisitor;
              return updated;
            } else {
              // Add new visitor
              return [newVisitor, ...prev.slice(0, 99)];
            }
          });
          
          setTotalVisitors(prev => {
            // Only increment if we actually added a new visitor
            const newCount = prev + 1;
            onVisitorCountChange?.(newCount);
            return newCount;
          });
          
          // Play sound notification (only for genuine new visitors)
          playNotificationSound();
        }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'visitors' },
        (payload) => {
          const updatedVisitor = payload.new as VisitorInfo;
          
          setVisitorLog(prev => {
            const existingIndex = prev.findIndex(v => 
              v.ip === updatedVisitor.ip && 
              v.browser === updatedVisitor.browser && 
              v.os === updatedVisitor.os
            );
            
            if (existingIndex !== -1) {
              // Update existing visitor timestamp
              const updated = [...prev];
              updated[existingIndex] = updatedVisitor;
              return updated;
            }
            
            return prev;
          });
          
          // Don't trigger notifications for updates, only for new visitors
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [onVisitorCountChange]);



  if (loading) {
    return (
      <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-yellow-500">Loading visitor data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const visibleLog = expanded ? visitorLog.slice(0, visibleCount) : visitorLog.slice(0, 3);

  const loadMore = () => {
    setVisibleCount(prev => Math.min(prev + 10, visitorLog.length));
  };

  const handleExpandClick = () => {
    if (!expanded) {
      setExpanded(true);
      setVisibleCount(10);
    } else {
      setExpanded(false);
      setVisibleCount(3);
    }
  };

  return (
    <div
      className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
      aria-live="polite"
    >
      <div className="hidden sm:grid sm:grid-cols-7 gap-4 text-sm text-gray-300 px-4 py-2">
        <div>IP</div>
        <div>Country</div>
        <div>City</div>
        <div>OS</div>
        <div>Browser</div>
        <div>Region</div>
        <div>Last Visit</div>
      </div>

      {visibleLog.map((visitor, index) => (
        <div 
          key={index} 
          className={`${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-300/50'} rounded-lg overflow-hidden`}
        >
          <div className={`sm:hidden p-4 space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`flex justify-between items-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="font-medium">{visitor.country}</div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{formatDistanceToNow(visitor.timestamp)} ago</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>IP: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.ip}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>City: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.city}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>OS: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.os || 'Unknown'}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browser: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.browser || 'Unknown'}</span>
              </div>
              <div className="col-span-2">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Region: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.region}</span>
              </div>
            </div>
          </div>

          <div className={`hidden sm:grid sm:grid-cols-7 gap-4 px-4 py-2 text-sm ${
            isDarkMode 
              ? 'text-gray-400 hover:bg-gray-800/70' 
              : 'text-gray-600 hover:bg-gray-200/70'
          }`}>
            <div className="truncate">{visitor.ip}</div>
            <div className="truncate">{visitor.country}</div>
            <div className="truncate">{visitor.city}</div>
            <div className="truncate">{visitor.os || 'Unknown'}</div>
            <div className="truncate">{visitor.browser || 'Unknown'}</div>
            <div className="truncate">{visitor.region}</div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>{formatDistanceToNow(visitor.timestamp)} ago</span>
            </div>
          </div>
        </div>
      ))}
      
      {visitorLog.length > 3 && (
        <div className="flex flex-col items-center space-y-2 mt-4">
          <button
            onClick={handleExpandClick}
            className={`flex items-center space-x-1 ${
              isDarkMode 
                ? 'text-yellow-500 hover:text-yellow-400' 
                : 'text-blue-700 hover:text-blue-600'
            }`}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span>Show less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span>Show more</span>
              </>
            )}
          </button>
          {expanded && visibleCount < visitorLog.length && (
            <button
              onClick={loadMore}
              className={`flex items-center space-x-1 text-sm ${
                isDarkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-600 hover:text-gray-700'
              }`}
            >
              <ChevronDown className="w-4 h-4" />
              <span>Load more entries ({visitorLog.length - visibleCount} remaining)</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
