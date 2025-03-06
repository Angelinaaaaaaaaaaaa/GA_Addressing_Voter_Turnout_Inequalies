import { useEffect, useCallback } from 'react';
import { useMap } from 'react-leaflet';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

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
    dashArray: string;
}

// Constants
const GEOJSON_STYLE: GeoJSONStyle = {
    color: '#666666',
    weight: 1,
    opacity: 0.1,
    fillOpacity: 0,
    dashArray: '5, 5',
};

const GEOJSON_PATH = '/data/geojson/ga_state_boundary/georgia-with-county-boundaries_1092.geojson';

const StateBoundary = () => {
    const map = useMap();

    // Load state boundary data and add it to the map
    const loadStateBoundary = useCallback(async () => {
        try {
            const [L, response] = await Promise.all([
                import('leaflet'),
                fetch(GEOJSON_PATH),
            ]);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
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
                map.removeLayer(geoJsonLayer);
            };
        } catch (error) {
            console.error('Error loading state boundary:', error);
        }
    }, [map]);

    useEffect(() => {
        loadStateBoundary();
    }, [loadStateBoundary]);

    return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

// Export with dynamic import to disable SSR
export default dynamic(() => Promise.resolve(StateBoundary), {
    ssr: false,
});