import {LatLngExpression} from 'leaflet'

// Coordinates for the boundaries of Georgia
const georgiaBounds: [[number, number], [number, number]] = [
    [30.3577, -85.6052], // Southwest corner of Georgia
    [35.0019, -80.7517], // Northeast corner of Georgia
]

export const AppConfig = {
    minZoom: 7, // Adjusted to show a broader area of Georgia
    maxZoom: 18, // Max zoom level
    ui: {
        topBarHeight: 32,
        bigIconSize: 48,
        mapIconSize: 24,
        markerIconSize: 16,
        menuIconSize: 16,
        topBarIconSize: 18,
    },
    baseCenter: [33.6407, -83.6762] as LatLngExpression, // Centered on Georgia, USA
    maxBounds: georgiaBounds, // Restrict the map to Georgia's bounds
    maxBoundsViscosity: 1.0, // Smooth transition at boundaries
}

export enum NavMenuVariant {
    INTRO = 'vertical',
    TOPNAV = 'horizontal',
}
