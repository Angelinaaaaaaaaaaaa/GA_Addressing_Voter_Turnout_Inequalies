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

const GEOJSON_PATH = '/data/geojson/ga_state_boundary/georgia-with-county-boundaries_1092.geojson';

const StateBoundary = () => {
  const map = useMap();

  // Load state boundary data and add it to the map
  const loadStateBoundary = useCallback(async () => {
    try {
      // Parallel loading of Leaflet library and GeoJSON data
      const [L, response] = await Promise.all([
        import('leaflet'),
        fetch(GEOJSON_PATH),
      ]);

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
        map.removeLayer(geoJsonLayer);
      };
    } catch (error) {
      console.error('Error loading state boundary:', error);
    }
  }, [map]);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Execute loading and store cleanup function
    loadStateBoundary().then((cleanupFn) => {
      cleanup = cleanupFn;
    });

    // Cleanup on component unmount
    return () => {
      cleanup?.();
    };
  }, [loadStateBoundary]);

  return null;
};

// Export with dynamic import to disable SSR
export default dynamic(() => Promise.resolve(StateBoundary), {
  ssr: false,
});