'use client'

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styles from './ClientMap.module.css';
import { VisitorLocation, ClientMapProps } from '../types/visitor';

export const ClientMap: React.FC<ClientMapProps> = ({ locations, currentVisitorLocation, isDarkMode }) => {
  const mapRef = useRef<L.Map | null>(null);
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([20, 0]);

  useEffect(() => {
    if (currentVisitorLocation) {
      setCurrentLocation([currentVisitorLocation.lat, currentVisitorLocation.lon]);
    } else if (locations.length > 0) {
      setCurrentLocation([locations[0].lat, locations[0].lon]);
    }
  }, [locations, currentVisitorLocation]);

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

    // Add regular visitor location markers
    locations?.forEach((location: VisitorLocation) => {
      const isCurrentVisitor = currentVisitorLocation &&
        Math.abs(location.lat - currentVisitorLocation.lat) < 0.01 &&
        Math.abs(location.lon - currentVisitorLocation.lon) < 0.01;

      if (!isCurrentVisitor) {
        const size = Math.min(8 + location.count * 1.5, 20);

        const regularIcon = L.divIcon({
          className: styles.regularIcon,
          html: `<div class="${styles.regularDot}" style="width: ${size}px; height: ${size}px;"></div>`,
          iconSize: [size, size],
        });

        const marker = L.marker([location.lat, location.lon], {
          icon: regularIcon
        }).addTo(mapRef.current!);

        const locationDisplay = location.city
          ? `${location.city}, ${location.country}`
          : location.country;

        const popupContent = `
          <div class="${styles.customPopup}">
            <span class="${styles.country}">${locationDisplay}</span>
            <span class="${styles.visits}">${location.count} visit${location.count > 1 ? 's' : ''}</span>
          </div>
        `;

        marker.bindPopup(popupContent, {
          className: styles.customPopupContainer
        });
      }
    });

    // Add current visitor marker (bigger and pulsing)
    if (currentVisitorLocation) {
      const currentVisitorData = locations.find(loc =>
        Math.abs(loc.lat - currentVisitorLocation.lat) < 0.01 &&
        Math.abs(loc.lon - currentVisitorLocation.lon) < 0.01
      ) || currentVisitorLocation;

      const size = Math.min(12 + currentVisitorData.count * 1, 18);

      const currentVisitorIcon = L.divIcon({
        className: styles.pulsingIcon,
        html: `<div class="${styles.pulse}" style="width: ${size}px; height: ${size}px;"></div>`,
        iconSize: [size, size],
      });

      const currentMarker = L.marker([currentVisitorLocation.lat, currentVisitorLocation.lon], {
        icon: currentVisitorIcon
      }).addTo(mapRef.current!);

      const currentLocationDisplay = currentVisitorLocation.city
        ? `${currentVisitorLocation.city}, ${currentVisitorLocation.country}`
        : currentVisitorLocation.country;

      const popupContent = `
        <div class="${styles.customPopup}">
          <span class="${styles.country}">${currentLocationDisplay} (You are here)</span>
          <span class="${styles.visits}">${currentVisitorData.count} visit${currentVisitorData.count > 1 ? 's' : ''}</span>
        </div>
      `;

      currentMarker.bindPopup(popupContent, {
        className: styles.customPopupContainer
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [locations, currentVisitorLocation, isDarkMode, currentLocation]);

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
