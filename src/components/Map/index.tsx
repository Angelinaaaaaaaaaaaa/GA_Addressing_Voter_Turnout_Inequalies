import Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import {useCallback, useEffect, useState} from 'react'
import {useResizeDetector} from 'react-resize-detector'
import debounce from 'lodash/debounce'

import MapTopBar from '#components/TopBar'
import {AppConfig} from '#lib/AppConfig'
import MarkerCategories, {Category} from '#lib/MarkerCategories'
import {Places, PlacesType} from '#lib/Places'

import LeafleftMapContextProvider from './LeafletMapContextProvider'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'
import MapLegend from './ui/MapLegend'
import StateBoundary from './StateBoundary'

/**
 * Dynamically imported components that require Leaflet
 * These components are loaded client-side only to avoid SSR issues with Leaflet
 */
const LeafletCluster = dynamic(async () => (await import('./LeafletCluster')).LeafletCluster(), {
    ssr: false,
})
const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
    ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./LeafletMarker')).CustomMarker, {
    ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
    ssr: false,
})
const LeafletMapContainer = dynamic(async () => (await import('./LeafletMapContainer')).LeafletMapContainer, {
    ssr: false,
})

/**
 * Interface defining the current view state of the map
 * Used for tracking map boundaries and zoom level
 */
export interface ViewState {
    /** Minimum latitude of the visible map area */
    minLat: number
    /** Minimum longitude of the visible map area */
    minLng: number
    /** Maximum latitude of the visible map area */
    maxLat: number
    /** Maximum longitude of the visible map area */
    maxLng: number
    /** Current zoom level of the map */
    zoomLevel: number
}

/**
 * Extracts the current view state from a Leaflet map instance
 *
 * @param map - The Leaflet map instance
 * @returns The current view state or undefined if map is not available
 */
const getViewState = (map?: Leaflet.Map): ViewState | undefined => {
    if (!map) return undefined

    const bounds = map.getBounds()
    const zoomLevel = map.getZoom()

    return {
        minLat: bounds.getSouthWest().lat,
        minLng: bounds.getSouthWest().lng,
        maxLat: bounds.getNorthEast().lat,
        maxLng: bounds.getNorthEast().lng,
        zoomLevel,
    }
}

/**
 * Props interface for the Map component
 */
interface MapProps {
    /** Callback function when clusters data changes */
    onClustersChange?: (clusters: Record<Category, PlacesType>) => void;
    /** Callback function when hidden categories change */
    onHiddenCategoriesChange?: (categories: Category[]) => void;
    /** Callback function when an error occurs */
    onError?: (error: Error) => void;
    /** Callback function when map is fully loaded */
    onLoad?: () => void;
}

/**
 * Inner Map Component
 *
 * Handles the core map functionality including:
 * - Marker clustering and management
 * - Category-based filtering
 * - Map view state tracking
 * - Event handling and callbacks
 *
 * @param props - Component props
 * @returns The rendered map component
 */
const LeafletMapInner: React.FC<MapProps> = ({
                                                 onClustersChange,
                                                 onHiddenCategoriesChange,
                                                 onError,
                                                 onLoad
                                             }) => {
    // Initialize state
    const [hiddenCategories, setHiddenCategories] = useState<Category[]>([])
    const {width: viewportWidth, height: viewportHeight, ref: viewportRef} = useResizeDetector()
    const {map} = useMapContext()
    const [viewState, setViewState] = useState(getViewState(map))

    /**
     * Handles toggling visibility of marker categories
     *
     * @param category - The category to toggle
     * @param visible - Whether the category should be visible
     */
    const handleCategoryToggle = useCallback((category: Category, visible: boolean) => {
        setHiddenCategories(prev =>
            visible
                ? prev.filter(c => c !== category)
                : [...prev, category]
        )
    }, [])

    /**
     * Shows all marker categories
     * Clears the hidden categories list
     */
    const handleShowAll = useCallback(() => {
        setHiddenCategories([])
    }, [])

    /**
     * Hides all marker categories
     * Sets all categories to hidden state
     */
    const handleHideAll = useCallback(() => {
        setHiddenCategories(Object.values(Category).map(category => category as Category))
    }, [])

    /**
     * Debounced handler for map movement events
     * Updates the view state after map movement stops
     * Uses a 250ms debounce to prevent excessive updates
     */
    const handleMapMoveEnd = useCallback(
        debounce(() => {
            setViewState(getViewState(map))
        }, 250),
        [map]
    )

    // Load marker data
    const markerQueryResponse = Places as PlacesType | undefined
    if (!markerQueryResponse) {
        console.warn('Places data is undefined')
        onError?.(new Error('Failed to load places data'))
    }

    // Set up map event listeners
    useEffect(() => {
        if (!map) return undefined

        map.on('moveend', handleMapMoveEnd)

        return () => {
            map.off('moveend', handleMapMoveEnd)
            handleMapMoveEnd.cancel()
        }
    }, [map, handleMapMoveEnd])

    // Process marker data
    const {clustersByCategory, allMarkersBoundCenter} = useMarkerData({
        locations: markerQueryResponse,
        map,
        viewportWidth,
        viewportHeight,
    })

    // Update parent component with cluster changes
    useEffect(() => {
        if (clustersByCategory && onClustersChange) {
            onClustersChange(clustersByCategory);
        }
    }, [clustersByCategory, onClustersChange]);

    // Update parent component with category visibility changes
    useEffect(() => {
        if (onHiddenCategoriesChange) {
            onHiddenCategoriesChange(hiddenCategories);
        }
    }, [hiddenCategories, onHiddenCategoriesChange]);

    const isLoading = !map || !viewportWidth || !viewportHeight

    /**
     * Initialize map view to show all markers
     * Centers the map on all markers and sets appropriate zoom level
     */
    useEffect(() => {
        if (!allMarkersBoundCenter || !map) return

        const timer = setTimeout(() => {
            const moveEnd = () => {
                map.off('moveend', moveEnd);
                onLoad?.(); // Notify parent when map is fully initialized
            };

            try {
                map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, {
                    animate: false,
                    duration: 0
                });
                map.once('moveend', moveEnd);
            } catch (error) {
                console.warn('Map flyTo failed:', error);
                onError?.(error instanceof Error ? error : new Error('Failed to initialize map'));
            }
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [allMarkersBoundCenter, map, onLoad, onError]);

    return (
        <div
            className="absolute w-full overflow-hidden"
            ref={viewportRef}
            style={{height: 'calc(100vh - 240px)'}}
        >
            <MapTopBar/>
            <div
                className={`absolute left-0 w-full transition-opacity ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                style={{
                    top: AppConfig.ui.topBarHeight,
                    width: viewportWidth ?? '100%',
                    height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
                }}
            >
                {allMarkersBoundCenter && clustersByCategory && (
                    <div className="h-full w-full">
                        <LeafletMapContainer
                            center={allMarkersBoundCenter.centerPos}
                            zoom={allMarkersBoundCenter.minZoom}
                            maxZoom={AppConfig.maxZoom}
                            minZoom={AppConfig.minZoom}
                        >
                            {!isLoading ? (
                                <>
                                    <StateBoundary/>
                                    <CenterToMarkerButton
                                        center={allMarkersBoundCenter.centerPos}
                                        zoom={allMarkersBoundCenter.minZoom}
                                    />
                                    <LocateButton/>
                                    {Object.entries(clustersByCategory).map(([categoryStr, markers]) => {
                                        const category = Number(categoryStr) as Category;
                                        if (hiddenCategories.includes(category)) {
                                            return null;
                                        }
                                        return (
                                            <LeafletCluster
                                                key={category}
                                                icon={MarkerCategories[category].icon}
                                                color="#3B82F6"
                                                chunkedLoading
                                            >
                                                {markers.map((marker) => (
                                                    <CustomMarker place={marker} key={marker.id}/>
                                                ))}
                                            </LeafletCluster>
                                        );
                                    })}
                                    <MapLegend
                                        onCategoryToggle={handleCategoryToggle}
                                        hiddenCategories={hiddenCategories}
                                        onShowAll={handleShowAll}
                                        onHideAll={handleHideAll}
                                    />
                                </>
                            ) : (
                                <></>
                            )}
                        </LeafletMapContainer>
                    </div>
                )}
            </div>
        </div>
    )
}

/**
 * Main Map Component
 *
 * Wraps the inner map component with the required context provider.
 * This ensures that all child components have access to the map context.
 *
 * @param props - Component props
 * @returns The rendered map component with context
 */
const Map: React.FC<MapProps> = (props) => (
    <LeafleftMapContextProvider>
        <LeafletMapInner {...props} />
    </LeafleftMapContextProvider>
)

export default Map
