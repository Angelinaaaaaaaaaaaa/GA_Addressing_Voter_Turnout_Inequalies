import { useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';

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

// Create a client-side only component
const ClientSideComponent = dynamic(
  () => import('react-leaflet').then((mod) => {
    // This function creates and returns a component that uses react-leaflet
    return function StateBoundaryInner() {
      const { useMap } = mod;
      const map = useMap();

      const loadStateBoundary = useCallback(async () => {
        try {
          // Dynamic import of leaflet
          const L = await import('leaflet').then(mod => mod.default || mod);
          
          const response = await fetch(GEOJSON_PATH);

          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(
                JSON.stringify({
                  status: response.status,
                  statusText: response.statusText,
                  url: response.url,
                  data: errorData,
                  message: `Request failed with status ${response.status}`
                })
            );
          }

          const data = await response.json();

          if (!data?.features) {
            console.error('Invalid state boundary data format:', data);
            return;
          }

          const geoJsonLayer = L.geoJSON(data, {
            style: GEOJSON_STYLE,
          }).addTo(map);

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

        const timer = setTimeout(() => {
          loadStateBoundary().then((cleanupFn) => {
            cleanup = cleanupFn;
          });
        }, 300);

        return () => {
          clearTimeout(timer);
          cleanup?.();
        };
      }, [loadStateBoundary]);

      return null;
    };
  }),
  { ssr: false, loading: () => null }
);

// Export the client-side component
export default ClientSideComponent;