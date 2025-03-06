import { useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import dynamic from 'next/dynamic';

// Type definitions
interface CountyProperties {
  coordinates: number[][][];
  [key: string]: any;
}

interface GeoJSONStyle {
  color: string;
  weight: number;
  opacity: number;
  fillOpacity: number;
}

// Constants
const GEOJSON_STYLE: GeoJSONStyle = {
  color: '#666666',
  weight: 1,
  opacity: 0.3,
  fillOpacity: 0,
};

const GEOJSON_PATH = '/data/geojson/georgia-with-county-boundaries.geojson';

// Create the actual component
const StateBoundaryComponent = () => {
  const map = useMap();

  // Load state boundary data and add it to the map
  const loadStateBoundary = useCallback(async () => {
    if (typeof window === 'undefined') return;

    try {
      // Ensure Leaflet is available
      // TypeScript needs this declaration to recognize L as a global variable
      const L = (window as any).L;
      if (!L) {
        console.error('Leaflet is not loaded');
        return;
      }

      // Fetch GeoJSON data
      const response = await fetch(GEOJSON_PATH);

      // Check if the HTTP response is successful
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Validate data format
      if (!data?.features) {
        console.error('Invalid state boundary data format:', data);
        return;
      }

      // Create and add GeoJSON layer to the map
      const geoJsonLayer = L.geoJSON(data, {
        style: GEOJSON_STYLE,
      }).addTo(map);

      // Return cleanup function
      return () => {
        if (map && geoJsonLayer) {
          map.removeLayer(geoJsonLayer);
        }
      };
    } catch (error) {
      console.error('Error loading state boundary:', error);
    }
  }, [map]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Only run in browser environment
    if (typeof window !== 'undefined') {
      // Small delay to ensure map and Leaflet are fully loaded
      const timer = setTimeout(() => {
        loadStateBoundary().then((cleanupFn) => {
          cleanup = cleanupFn;
        });
      }, 300);

      return () => {
        clearTimeout(timer);
        cleanup?.();
      };
    }

    return undefined;
  }, [loadStateBoundary]);

  return null;
};

// Export with dynamic import to disable SSR
export default dynamic(() => Promise.resolve(StateBoundaryComponent), {
  ssr: false,
});