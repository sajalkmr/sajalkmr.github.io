'use client'

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';
import { VisitorLocation } from '../types/visitor';
import { supabase } from '../../lib/supabaseClient';



const ClientMap = dynamic(
  () => import('./ClientMap').then(mod => ({ default: mod.ClientMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <span className="text-yellow-500 text-sm sm:text-base md:text-lg font-medium">Loading map...</span>
        </div>
      </div>
    )
  }
);

interface VisitorMapProps {
  isDarkMode: boolean;
}

export const VisitorMap: React.FC<VisitorMapProps> = ({ isDarkMode }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const mapStyle = isDarkMode 
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11';

  const [visitorLocations, setVisitorLocations] = useState<VisitorLocation[]>([]);
  const [currentVisitorLocation, setCurrentVisitorLocation] = useState<VisitorLocation | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -100px 0px', threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const getVisitorLocation = async () => {
      try {
        // Get current visitor's location from IP
        let locationData;
        try {
          const response = await axios.get('https://ipwho.is/', { 
            timeout: 8000,
            headers: {
              'Accept': 'application/json',
            }
          });

          if (response.data && 
              typeof response.data.latitude === 'number' && !isNaN(response.data.latitude) &&
              typeof response.data.longitude === 'number' && !isNaN(response.data.longitude) &&
              typeof response.data.country === 'string') {
            locationData = {
              country: response.data.country,
              city: response.data.city || undefined,
              latitude: response.data.latitude,
              longitude: response.data.longitude
            };
          } else {
            console.warn('Invalid API response:', response.data);
            throw new Error('Invalid location data received');
          }
        } catch (apiError) {
          console.error('Error fetching location data:', apiError);
          throw apiError;
        }

        // Set current visitor location
        const currentLocation: VisitorLocation = {
          country: locationData.country,
          city: locationData.city,
          lat: locationData.latitude,
          lon: locationData.longitude,
          count: 1
        };
        setCurrentVisitorLocation(currentLocation);

        let existingLocations: VisitorLocation[] = [];

        // Try to fetch from Supabase first
        if (supabase) {
          try {
            // Fetch all visitor locations from Supabase
            const { data: visitors, error } = await supabase
              .from('visitors')
              .select('country, city, lat, lon, timestamp')
              .order('timestamp', { ascending: false });

            if (error) {
              console.error('Supabase fetch error:', error);
              throw error;
            }

            if (visitors && visitors.length > 0) {
              // Group visitors by city and country, then by approximate location
              const locationMap = new Map<string, VisitorLocation>();
              
              for (const visitor of visitors) {
                if (typeof visitor.lat === 'number' && typeof visitor.lon === 'number' && 
                    !isNaN(visitor.lat) && !isNaN(visitor.lon)) {
                  // Create a key based on city and country, with fallback to coordinates
                  const cityKey = visitor.city && visitor.city.trim() 
                    ? `${visitor.city}, ${visitor.country}`
                    : `${visitor.country}`;
                  
                  // For same city, group by approximate coordinates to handle multiple locations within city
                  const roundedLat = Math.round(visitor.lat * 10) / 10; // Round to ~10km precision for cities
                  const roundedLon = Math.round(visitor.lon * 10) / 10;
                  const key = `${cityKey}-${roundedLat}-${roundedLon}`;
                  
                  if (locationMap.has(key)) {
                    const existing = locationMap.get(key)!;
                    locationMap.set(key, { ...existing, count: existing.count + 1 });
                  } else {
                    locationMap.set(key, {
                      country: visitor.country,
                      city: visitor.city || undefined,
                      lat: visitor.lat,
                      lon: visitor.lon,
                      count: 1
                    });
                  }
                }
              }
              
              existingLocations = Array.from(locationMap.values());
            }

            // Update current visitor's count if they exist in the data
            const currentLocationInData = existingLocations.find(
              loc => Math.abs(loc.lat - locationData.latitude) < 0.01 && 
                    Math.abs(loc.lon - locationData.longitude) < 0.01
            );

            if (currentLocationInData) {
              setCurrentVisitorLocation({
                ...currentLocation,
                count: currentLocationInData.count + 1
              });
            }

          } catch (supabaseError) {
            console.error('Supabase error, falling back to localStorage:', supabaseError);
            // Fall back to localStorage
            try {
              const storedLocations = localStorage.getItem('visitorLocations');
              if (storedLocations) {
                const parsed = JSON.parse(storedLocations);
                existingLocations = parsed.filter((loc: any) => 
                  typeof loc.lat === 'number' && !isNaN(loc.lat) &&
                  typeof loc.lon === 'number' && !isNaN(loc.lon) &&
                  typeof loc.country === 'string' &&
                  typeof loc.count === 'number'
                );
              }
            } catch (storageErr) {
              existingLocations = [];
            }

            // Update localStorage with current visitor
            const existingLocationIndex = existingLocations.findIndex(
              loc => Math.abs(loc.lat - locationData.latitude) < 0.01 && 
                    Math.abs(loc.lon - locationData.longitude) < 0.01
            );

            let updatedLocations;
            if (existingLocationIndex >= 0) {
              updatedLocations = [...existingLocations];
              updatedLocations[existingLocationIndex] = {
                ...updatedLocations[existingLocationIndex],
                count: updatedLocations[existingLocationIndex].count + 1
              };
              setCurrentVisitorLocation({
                ...currentLocation,
                count: updatedLocations[existingLocationIndex].count
              });
            } else {
              updatedLocations = [...existingLocations, currentLocation];
            }

            try {
              localStorage.setItem('visitorLocations', JSON.stringify(updatedLocations));
            } catch (storageErr) {
              console.error('Error saving to localStorage:', storageErr);
            }

            existingLocations = updatedLocations;
          }
        } else {
          // No Supabase, use localStorage only
          try {
            const storedLocations = localStorage.getItem('visitorLocations');
            if (storedLocations) {
              const parsed = JSON.parse(storedLocations);
              existingLocations = parsed.filter((loc: any) => 
                typeof loc.lat === 'number' && !isNaN(loc.lat) &&
                typeof loc.lon === 'number' && !isNaN(loc.lon) &&
                typeof loc.country === 'string' &&
                typeof loc.count === 'number'
              );
            }
          } catch (storageErr) {
            existingLocations = [];
          }

          const existingLocationIndex = existingLocations.findIndex(
            loc => Math.abs(loc.lat - locationData.latitude) < 0.01 && 
                  Math.abs(loc.lon - locationData.longitude) < 0.01
          );

          let updatedLocations;
          if (existingLocationIndex >= 0) {
            updatedLocations = [...existingLocations];
            updatedLocations[existingLocationIndex] = {
              ...updatedLocations[existingLocationIndex],
              count: updatedLocations[existingLocationIndex].count + 1
            };
            setCurrentVisitorLocation({
              ...currentLocation,
              count: updatedLocations[existingLocationIndex].count
            });
          } else {
            updatedLocations = [...existingLocations, currentLocation];
          }

          try {
            localStorage.setItem('visitorLocations', JSON.stringify(updatedLocations));
          } catch (storageErr) {
            console.error('Error saving to localStorage:', storageErr);
          }

          existingLocations = updatedLocations;
        }

        setVisitorLocations(existingLocations);
        setLoading(false);
      } catch (err) {
        console.error('Error in visitor tracking:', err);
        setError('Unable to load visitor data');
        setLoading(false);
      }
    };

    getVisitorLocation();
  }, []);

  if (inView && loading) {
    return (
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <LoadingSpinner size="lg" />
            <span className="text-yellow-500 text-lg font-medium">Loading visitor data...</span>
          </div>
        </div>
      </div>
    );
  }

  if (inView && error) {
    return (
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-red-500 text-lg">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="container mx-auto px-0 sm:px-4 max-w-5xl">
      <div className="h-[300px] sm:h-[400px] md:h-[500px] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        {inView ? (
          <ClientMap 
            locations={visitorLocations} 
            currentVisitorLocation={currentVisitorLocation}
            isDarkMode={isDarkMode} 
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <LoadingSpinner size="lg" />
          </div>
        )}
      </div>
    </div>
  );
};
