'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { VisitorInfo } from '../types/visitor';

interface VisitorLogProps {
  isDarkMode: boolean;
}

export const VisitorLog: React.FC<VisitorLogProps> = ({ isDarkMode }) => {
  const [visitorLog, setVisitorLog] = useState<VisitorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const getVisitorInfo = async () => {
      try {
        const existingLog: VisitorInfo[] = JSON.parse(
          localStorage.getItem('visitorLog') || '[]'
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
          os: navigator.userAgent.match(/Windows|Mac OS X|Linux|Android|iOS/)![0],
          browser: navigator.userAgent.match(/Chrome|Firefox|Safari|Edge|Opera/)![0],
          timestamp: Date.now(),
        };

        const updatedLog = [visitorInfo, ...existingLog].slice(0, 100);
        localStorage.setItem('visitorLog', JSON.stringify(updatedLog));
        setVisitorLog(updatedLog);
        setLoading(false);
      } catch (err) {
        console.error('Error in visitor logging:', err);
        try {
          const existingLog = JSON.parse(localStorage.getItem('visitorLog') || '[]');
          if (existingLog.length > 0) {
            setVisitorLog(existingLog);
          } else {
            setError('Unable to load visitor data');
          }
        } catch (localStorageErr) {
          setError('Unable to load visitor data');
        }
        setLoading(false);
      }
    };

    getVisitorInfo();
  }, []);

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
    <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
      <div className="hidden sm:grid sm:grid-cols-7 gap-4 text-sm text-gray-500 px-4 py-2">
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
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>IP: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.ip}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>City: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.city}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>OS: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.os || 'Unknown'}</span>
              </div>
              <div>
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Browser: </span>
                <span className={`${isDarkMode ? 'text-gray-400' : 'text-gray-700'}`}>{visitor.browser || 'Unknown'}</span>
              </div>
              <div className="col-span-2">
                <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-600'}`}>Region: </span>
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
