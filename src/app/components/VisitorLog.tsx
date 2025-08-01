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
  const [, setTotalVisitors] = useState(0);



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
    let isMounted = true;

    const getVisitorInfo = async () => {
      if (!isMounted) return;
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

            const { data: existingVisitors, error: selectError } = await supabase
              .from('visitors')
              .select('*')
              .eq('ip', visitorInfo.ip)
              .eq('browser', visitorInfo.browser)
              .eq('os', visitorInfo.os)
              .gte('timestamp', thirtyMinutesAgo)
              .order('timestamp', { ascending: false })
              .limit(1);

            if (selectError) {
              console.error('Supabase select error:', selectError);
            }

            const existingVisitor = existingVisitors && existingVisitors.length > 0 ? existingVisitors[0] : null;
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

          // Retrieve all visitors from Supabase for processing
          const { data: dbData, error: dbError } = await supabase
            .from('visitors')
            .select('*')
            .order('timestamp', { ascending: false });

          if (dbError) {
            console.error('Supabase fetch error:', dbError);
            setVisitorLog(existingLog);
            setTotalVisitors(existingLog.length);
            onVisitorCountChange?.(existingLog.length);
          } else {
            console.log('Processing', dbData?.length, 'visitors from Supabase');

            // TEMPORARY: Show ALL visitors with no deduplication for debugging
            console.log('Showing ALL visitors without deduplication for debugging...');

            // Debug: Show sample of raw data
            console.log('Sample raw visitors:', (dbData as VisitorInfo[]).slice(0, 10).map(v => ({
              ip: v.ip,
              country: v.country,
              city: v.city,
              browser: v.browser,
              os: v.os,
              timestamp: v.timestamp
            })));

            // Debug: Show unique IPs
            const uniqueIPs = new Set((dbData as VisitorInfo[]).map(v => v.ip));
            console.log('Unique IPs in database:', Array.from(uniqueIPs));

            // Debug: Show unique countries
            const uniqueCountries = new Set((dbData as VisitorInfo[]).map(v => v.country));
            console.log('Unique countries in database:', Array.from(uniqueCountries));

            // Count entries per IP
            const ipCounts = new Map<string, number>();
            for (const visitor of dbData as VisitorInfo[]) {
              ipCounts.set(visitor.ip, (ipCounts.get(visitor.ip) || 0) + 1);
            }
            console.log('Entries per IP:', Object.fromEntries(ipCounts));

            // Show diverse visitors: prioritize unique IPs, then recent visits from each IP
            const visitorsByIP = new Map<string, VisitorInfo[]>();

            // Group all visitors by IP
            for (const visitor of dbData as VisitorInfo[]) {
              if (!visitorsByIP.has(visitor.ip)) {
                visitorsByIP.set(visitor.ip, []);
              }
              visitorsByIP.get(visitor.ip)!.push(visitor);
            }



            // For each IP, take the most recent visit and maybe 1-2 older ones
            const sortedVisitors: VisitorInfo[] = [];

            for (const [ip, visits] of visitorsByIP.entries()) {
              // Sort visits by timestamp (newest first)
              visits.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

              // Always take the most recent visit
              sortedVisitors.push(visits[0]);

              // If this IP has many visits, take one older visit too (for session diversity)
              if (visits.length > 5) {
                const olderVisit = visits[Math.floor(visits.length / 2)]; // Take middle visit
                sortedVisitors.push(olderVisit);
              }
            }

            // Sort final list by timestamp (newest first) and limit to 50
            sortedVisitors.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
            const finalVisitors = sortedVisitors.slice(0, 50);



            setVisitorLog(finalVisitors);

            // For visitor count, count truly unique visitors (by IP+browser+OS only)
            const uniqueVisitorKeys = new Set<string>();
            for (const visitor of dbData as VisitorInfo[]) {
              const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`;
              uniqueVisitorKeys.add(key);
            }
            setTotalVisitors(uniqueVisitorKeys.size);

            // Notify parent of unique visitor count
            onVisitorCountChange?.(uniqueVisitorKeys.size);
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

          // Count unique visitors for the counter
          const uniqueVisitorKeys = new Set<string>();
          for (const visitor of updatedLog) {
            const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`;
            uniqueVisitorKeys.add(key);
          }
          setTotalVisitors(uniqueVisitorKeys.size);

          // Notify parent of unique visitor count
          onVisitorCountChange?.(uniqueVisitorKeys.size);

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

            // Count unique visitors for the counter
            const uniqueVisitorKeys = new Set<string>();
            for (const visitor of existingLog) {
              const key = `${visitor.ip}-${visitor.browser}-${visitor.os}`;
              uniqueVisitorKeys.add(key);
            }
            setTotalVisitors(uniqueVisitorKeys.size);
            onVisitorCountChange?.(uniqueVisitorKeys.size);
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

    return () => {
      isMounted = false;
    };
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
            // Apply the same deduplication logic as in the main fetch
            const visitorKey = `${newVisitor.ip}-${newVisitor.browser}-${newVisitor.os}`;
            const newVisitorTime = new Date(newVisitor.timestamp).getTime();
            const thirtyMinutesInMs = 30 * 60 * 1000;

            // Check if we already have a recent entry for this visitor
            const existingIndex = prev.findIndex(v => {
              const existingKey = `${v.ip}-${v.browser}-${v.os}`;
              if (existingKey !== visitorKey) return false;

              const existingTime = new Date(v.timestamp).getTime();
              const timeDiff = Math.abs(newVisitorTime - existingTime);
              return timeDiff < thirtyMinutesInMs;
            });

            if (existingIndex !== -1) {
              // Update existing visitor with newer timestamp
              const updated = [...prev];
              updated[existingIndex] = newVisitor;
              return updated;
            } else {
              // Add as new entry (different session)
              return [newVisitor, ...prev.slice(0, 99)];
            }
          });

          // Don't play sound for your own visits during development
          // playNotificationSound();
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
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [onVisitorCountChange]);



  if (loading) {
    return (
      <div className="h-[300px] sm:h-[350px] md:h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-yellow-500 text-sm sm:text-base">Loading visitor data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[300px] sm:h-[350px] md:h-[400px] bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-red-500 text-sm sm:text-base text-center px-4">{error}</div>
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
      <div className="hidden md:grid md:grid-cols-7 gap-2 lg:gap-4 text-xs lg:text-sm text-gray-300 px-2 lg:px-4 py-2">
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
          <div className={`md:hidden p-3 sm:p-4 space-y-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <div className="font-medium text-base">{visitor.country}</div>
              <div className="flex items-center space-x-1 text-xs">
                <Clock className="w-3 h-3 flex-shrink-0" />
                <span>{formatDistanceToNow(visitor.timestamp)} ago</span>
              </div>
            </div>
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-xs">
              <div className="truncate">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>IP: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.ip}</span>
              </div>
              <div className="truncate">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>City: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.city}</span>
              </div>
              <div className="truncate">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>OS: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.os || 'Unknown'}</span>
              </div>
              <div className="truncate">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Browser: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.browser || 'Unknown'}</span>
              </div>
              <div className="col-span-1 xs:col-span-2 truncate">
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Region: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.region}</span>
              </div>
            </div>
          </div>

          <div className={`hidden md:grid md:grid-cols-7 gap-2 lg:gap-4 px-2 lg:px-4 py-2 text-xs lg:text-sm ${isDarkMode
            ? 'text-gray-400 hover:bg-gray-800/70'
            : 'text-gray-600 hover:bg-gray-200/70'
            }`}>
            <div className="truncate" title={visitor.ip}>{visitor.ip}</div>
            <div className="truncate" title={visitor.country}>{visitor.country}</div>
            <div className="truncate" title={visitor.city}>{visitor.city}</div>
            <div className="truncate" title={visitor.os || 'Unknown'}>{visitor.os || 'Unknown'}</div>
            <div className="truncate" title={visitor.browser || 'Unknown'}>{visitor.browser || 'Unknown'}</div>
            <div className="truncate" title={visitor.region}>{visitor.region}</div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{formatDistanceToNow(visitor.timestamp)} ago</span>
            </div>
          </div>
        </div>
      ))}

      {visitorLog.length > 3 && (
        <div className="flex flex-col items-center space-y-2 mt-4">
          <button
            onClick={handleExpandClick}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 ${isDarkMode
              ? 'text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10'
              : 'text-blue-700 hover:text-blue-600 hover:bg-blue-700/10'
              }`}
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                <span className="text-sm">Show less</span>
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                <span className="text-sm">Show more</span>
              </>
            )}
          </button>
          {expanded && visibleCount < visitorLog.length && (
            <button
              onClick={loadMore}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors duration-200 text-sm ${isDarkMode
                ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
                : 'text-gray-600 hover:text-gray-700 hover:bg-gray-300/30'
                }`}
            >
              <ChevronDown className="w-4 h-4" />
              <span className="hidden sm:inline">Load more entries ({visitorLog.length - visibleCount} remaining)</span>
              <span className="sm:hidden">Load more ({visitorLog.length - visibleCount})</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
