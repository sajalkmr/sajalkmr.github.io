'use client'

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ClientMap.module.css';
import { VisitorLocation } from '../types/visitor';

interface ClientMapProps {
  locations: VisitorLocation[];
  isDarkMode: boolean;
}

export const ClientMap: React.FC<ClientMapProps> = ({ locations, isDarkMode }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([20, 0]);

  useEffect(() => {
    if (locations.length > 0) {
      setCurrentLocation([locations[0].lat, locations[0].lon]);
    }
  }, [locations]);

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = L.map('map', {
        center: currentLocation,
        zoom: 2,
        minZoom: window.innerWidth < 768 ? 1 : 2,
        maxZoom: 5,
        zoomControl: false,
        attributionControl: false
      });

      L.tileLayer(isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
      {
        attribution: 'OpenStreetMap, CartoDB'
      }).addTo(mapRef.current);

      L.control.attribution({
        position: 'bottomright'
      }).addTo(mapRef.current);
    } else {
      mapRef.current.eachLayer((layer) => {
        if (layer instanceof L.TileLayer) {
          layer.remove();
        }
      });
      
      L.tileLayer(isDarkMode 
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', 
      {
        attribution: 'OpenStreetMap, CartoDB'
      }).addTo(mapRef.current);

      mapRef.current.setView(currentLocation, window.innerWidth < 768 ? 1 : 2);
    }

    if (mapRef.current) {
      mapRef.current.eachLayer((layer: L.Layer) => {
        if (layer instanceof L.CircleMarker) {
          layer.remove();
        }
      });
    }

    locations?.forEach((location: VisitorLocation) => {
      const size = Math.min(10 + location.count * 2, 25);
      
      const pulsingIcon = L.divIcon({
        className: styles.pulsingIcon,
        html: `<div class="${styles.pulse}" style="width: ${size}px; height: ${size}px;"></div>`,
        iconSize: [size, size],
      });

      const marker = L.marker([location.lat, location.lon], {
        icon: pulsingIcon
      }).addTo(mapRef.current!);

      const popupContent = `
        <div class="${styles.customPopup}">
          <span class="${styles.country}">${location.country}</span>
          <span class="${styles.visits}">${location.count} visit${location.count > 1 ? 's' : ''}</span>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: styles.customPopupContainer
      });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, isDarkMode, currentLocation]);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.setZoom(window.innerWidth < 768 ? 1 : 2);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <div id="map" className={styles.map} />;
};
