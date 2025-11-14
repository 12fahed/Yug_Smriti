"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] }); // Load Cinzel font

// Define the component props interface
interface FahedMapProps {
  year: string | number; // Year can be string or number depending on your use case
}

// Set the access token (make sure this is defined)
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY || '';

const FahedMap: React.FC<FahedMapProps> = ({ year }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return; // Initialize map only once and ensure container exists
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/cosmicraptor/cm67xg2ub00ic01qsarmtafbp',
      center: [0, 0],
      zoom: 2,
    });
  }, []);

  useEffect(() => {
    if (!map.current || !year) return;

    const geojsonUrl = `/geojsondata/world_${year}.geojson`; // GeoJSON hosted in the public folder
    console.log(geojsonUrl);
    
    fetch(geojsonUrl)
      .then((response) => response.json())
      .then((data) => {
        const currentMap = map.current;
        if (!currentMap) return;

        const source = currentMap.getSource('geojson-data') as mapboxgl.GeoJSONSource;
        
        if (source) {
          source.setData(data);
        } else {
          currentMap.addSource('geojson-data', {
            type: 'geojson',
            data: data,
          });

          // Add a line layer for borders
          currentMap.addLayer({
            id: 'geojson-layer',
            type: 'line',
            source: 'geojson-data',
            paint: {
              'line-color': '#171717',
              'line-width': 2,
            },
          });

          // Add a symbol layer for region labels
          currentMap.addLayer({
            id: 'region-labels',
            type: 'symbol',
            source: 'geojson-data',
            layout: {
              'text-field': ['get', 'NAME'], // Assumes each GeoJSON feature has a "NAME" property
              'text-font': ['Open Sans Bold', 'Arial Unicode MS Bold'], // Default Mapbox fonts
              'text-size': 14,
              'text-anchor': 'center',
            },
            paint: {
              'text-color': '#000',
              'text-halo-color': '#fff',
              'text-halo-width': 1,
            },
          });
        }
      })
      .catch((err) => console.error('Failed to load GeoJSON:', err));
  }, [year]);

  return (
    <div
      ref={mapContainer}
      className={`w-full h-screen ${cinzel.className}`} // Apply Cinzel font globally
    />
  );
};

export default FahedMap;