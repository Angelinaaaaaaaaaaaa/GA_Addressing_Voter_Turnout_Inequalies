import {LatLngExpression, Map} from 'leaflet'
import {useCallback, useEffect, useMemo, useState, useRef} from 'react'
import debounce from 'lodash/debounce'

import useLeafletWindow from '#components/Map/useLeafletWindow'
import {AppConfig} from '#lib/AppConfig'
import {PlacesType} from '#lib/Places'
import {Category} from '#lib/MarkerCategories'

interface useMapDataValues {
    locations?: PlacesType
    map?: Map
    viewportWidth?: number
    viewportHeight?: number
}

interface allMarkerPosValues {
    minZoom: number
    centerPos: LatLngExpression
}

interface UseMarkerDataReturn {
    clustersByCategory?: Record<Category, PlacesType>
    allMarkersBoundCenter?: allMarkerPosValues
    isLoading: boolean
    error?: Error
}

const useMarkerData = ({locations, map, viewportWidth, viewportHeight}: useMapDataValues): UseMarkerDataReturn => {
    const leafletWindow = useLeafletWindow()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error>()
    const hasInitialized = useRef(false)
    const [visibleLocations, setVisibleLocations] = useState<PlacesType>([])
    const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
        minZoom: AppConfig.minZoom - 5,
        centerPos: AppConfig.baseCenter,
    })

    // Calculate bounds for all markers
    const allMarkerBounds = useMemo(() => {
        if (!leafletWindow || !locations) return undefined
        try {
            return leafletWindow.latLngBounds(locations.map(item => item.position))
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to calculate marker bounds'))
            return undefined
        }
    }, [leafletWindow, locations])

    // Group locations by category
    const groupLocationsByCategory = useCallback((locs: PlacesType): Record<Category, PlacesType> => {
        return locs.reduce<Record<Category, PlacesType>>((acc, location) => {
            if (!location?.category) return acc
            const category = location.category as Category
            if (!acc[category]) acc[category] = []
            acc[category].push(location)
            return acc
        }, {} as Record<Category, PlacesType>)
    }, [])

    // Update visible locations based on map bounds
    const updateVisibleLocations = useCallback(
        debounce(() => {
            if (!map || !locations) return
            try {
                const bounds = map.getBounds()
                setVisibleLocations(locations.filter(location => bounds.contains(location.position)))
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to update visible locations'))
            }
        }, 50),
        [map, locations]
    )

    // Initialize locations and handle map events
    useEffect(() => {
        if (!map || !locations) return

        // Set initial visible locations
        setVisibleLocations(locations)
        
        // Handle map updates
        const handleUpdate = () => {
            const bounds = map.getBounds()
            setVisibleLocations(locations.filter(location => bounds.contains(location.position)))
        }

        map.on('moveend', handleUpdate)
        map.on('zoomend', handleUpdate)

        return () => {
            map.off('moveend', handleUpdate)
            map.off('zoomend', handleUpdate)
        }
    }, [map, locations])

    // Initial map setup
    useEffect(() => {
        if (!allMarkerBounds || !map || hasInitialized.current) return

        try {
            const newBounds = allMarkerBounds.pad(0.1)
            map.fitBounds(newBounds, {
                animate: false,
                maxZoom: 8,
                padding: [50, 50]
            })

            setAllMarkersBoundCenter({
                minZoom: Math.min(map.getBoundsZoom(newBounds), 8),
                centerPos: [newBounds.getCenter().lat, newBounds.getCenter().lng],
            })

            hasInitialized.current = true
            setIsLoading(false)
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to initialize map'))
        }
    }, [allMarkerBounds, map])

    // Handle viewport resize
    useEffect(() => {
        if (!map || !viewportWidth || !viewportHeight) return
        map.invalidateSize()
    }, [map, viewportWidth, viewportHeight])

    // Calculate clusters by category
    const clustersByCategory = useMemo(() => {
        const locsToGroup = visibleLocations?.length ? visibleLocations : locations
        return locsToGroup ? groupLocationsByCategory(locsToGroup) : undefined
    }, [visibleLocations, locations, groupLocationsByCategory])

    // Cleanup
    useEffect(() => () => {
        setError(undefined)
        setIsLoading(false)
    }, [])

    return {clustersByCategory, allMarkersBoundCenter, isLoading, error}
}

export default useMarkerData
