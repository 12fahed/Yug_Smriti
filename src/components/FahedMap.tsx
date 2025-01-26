"use client";

import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] }); // Load Cinzel font
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_KEY;

const FahedMap = ({ year }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);

  useEffect(() => {
    if (map.current) return; // Initialize map only once
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
        if (map.current.getSource('geojson-data')) {
          map.current.getSource('geojson-data').setData(data);
        } else {
          map.current.addSource('geojson-data', {
            type: 'geojson',
            data: data,
          });

          // Add a line layer for borders
          map.current.addLayer({
            id: 'geojson-layer',
            type: 'line',
            source: 'geojson-data',
            paint: {
              'line-color': '#171717',
              'line-width': 2,
            },
          });

          // Add a symbol layer for region labels
          map.current.addLayer({
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
