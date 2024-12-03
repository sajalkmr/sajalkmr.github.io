'use client'

import { useEffect, useState } from 'react';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { LoadingSpinner } from './LoadingSpinner';
import { VisitorLocation } from '../types/visitor';

const ClientMap = dynamic(
  () => import('./ClientMap').then(mod => ({ default: mod.ClientMap })),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] md:h-[600px] bg-gray-800 rounded-lg flex items-center justify-center shadow-lg">
        <div className="flex flex-col items-center space-y-4">
          <LoadingSpinner size="lg" />
          <span className="text-yellow-500 text-lg font-medium">Loading map...</span>
        </div>
      </div>
    )
  }
);

interface VisitorMapProps {
  isDarkMode: boolean;
}

export const VisitorMap: React.FC<VisitorMapProps> = ({ isDarkMode }) => {
  const mapStyle = isDarkMode 
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11';

  const [visitorLocations, setVisitorLocations] = useState<VisitorLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getVisitorLocation = async () => {
      try {
        let existingLocations: VisitorLocation[] = [];
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
              latitude: response.data.latitude,
              longitude: response.data.longitude
            };
          } else {
            console.warn('Invalid API response:', response.data);
            throw new Error('Invalid location data received');
          }
        } catch (apiError) {
          console.error('Error fetching location data:', apiError);
          if (existingLocations.length > 0) {
            setVisitorLocations(existingLocations);
            setLoading(false);
            return;
          }
          throw apiError;
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
        } else {
          const newLocation: VisitorLocation = {
            country: locationData.country,
            lat: locationData.latitude,
            lon: locationData.longitude,
            count: 1
          };
          updatedLocations = [...existingLocations, newLocation];
        }

        try {
          localStorage.setItem('visitorLocations', JSON.stringify(updatedLocations));
        } catch (storageErr) {
          console.error('Error saving to localStorage:', storageErr);
        }

        setVisitorLocations(updatedLocations);
        setLoading(false);
      } catch (err) {
        console.error('Error in visitor tracking:', err);
        setError('Unable to load visitor data');
        setLoading(false);
      }
    };

    getVisitorLocation();
  }, []);

  if (loading) {
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

  if (error) {
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
    <div className="container mx-auto px-4 max-w-5xl">
      <div className="h-[500px] md:h-[600px] bg-gray-800 rounded-lg overflow-hidden shadow-lg">
        <ClientMap locations={visitorLocations} isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};
