import { LatLngExpression, Map } from 'leaflet'
import { useEffect, useMemo, useState, useCallback } from 'react'
import debounce from 'lodash/debounce'

import useLeafletWindow from '#components/Map/useLeafletWindow'
import { AppConfig } from '#lib/AppConfig'
import { PlacesType } from '#lib/Places'
import { Category } from '#lib/MarkerCategories'

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

const useMarkerData = ({ locations, map, viewportWidth, viewportHeight }: useMapDataValues): UseMarkerDataReturn => {
  const leafletWindow = useLeafletWindow()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error>()

  const [allMarkersBoundCenter, setAllMarkersBoundCenter] = useState<allMarkerPosValues>({
    minZoom: AppConfig.minZoom - 5,
    centerPos: AppConfig.baseCenter,
  })

  const [visibleLocations, setVisibleLocations] = useState<PlacesType>([])

  // get bounds of all markers with error handling
  const allMarkerBounds = useMemo(() => {
    if (!leafletWindow || !locations) return undefined

    try {
      const coordsSum: LatLngExpression[] = locations.map(item => item.position)
      return leafletWindow.latLngBounds(coordsSum)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to calculate marker bounds'))
      return undefined
    }
  }, [leafletWindow, locations])

  // Initialize visible locations with all locations
  useEffect(() => {
    if (locations) {
      setVisibleLocations(locations)
      setIsLoading(false)
    }
  }, [locations])

  // Debounced update visible locations function
  const updateVisibleLocations = useCallback(
    debounce(() => {
      if (!map || !locations) return

      try {
        const bounds = map.getBounds()
        const visible = locations.filter(location => bounds.contains(location.position))
        setVisibleLocations(visible)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to update visible locations'))
      }
    }, 150),
    [map, locations]
  )

  // Update visible locations when map moves
  useEffect(() => {
    if (!map || !locations) return

    map.on('moveend', updateVisibleLocations)

    return () => {
      map.off('moveend', updateVisibleLocations)
      updateVisibleLocations.cancel() // Cancel any pending debounced calls
    }
  }, [map, locations, updateVisibleLocations])

  const clustersByCategory = useMemo(() => {
    if (!visibleLocations.length) return undefined

    try {
      // Group visible locations by category with validation
      return visibleLocations.reduce<Record<Category, PlacesType>>((acc, location) => {
        if (!location || !location.category) return acc
        
        const category = location.category as Category
        if (!acc[category]) {
          acc[category] = []
        }
        acc[category].push(location)
        return acc
      }, {} as Record<Category, PlacesType>)
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to group locations by category'))
      return undefined
    }
  }, [visibleLocations])

  // auto resize map to fit all markers on viewport change
  useEffect(() => {
    if (!allMarkerBounds || !leafletWindow || !map) return
    if (!viewportWidth || !viewportHeight) return

    let isSubscribed = true

    const resizeMap = async () => {
      try {
        const el = map.invalidateSize()
        if (!el) return

        const newBounds = allMarkerBounds.pad(0.1) // Add 10% padding
        map.fitBounds(newBounds)
        
        if (isSubscribed) {
          setAllMarkersBoundCenter({
            minZoom: map.getBoundsZoom(newBounds),
            centerPos: [newBounds.getCenter().lat, newBounds.getCenter().lng],
          })
        }
      } catch (err) {
        if (isSubscribed) {
          setError(err instanceof Error ? err : new Error('Failed to resize map'))
        }
      }
    }

    resizeMap()

    return () => {
      isSubscribed = false
    }
  }, [allMarkerBounds, leafletWindow, map, viewportWidth, viewportHeight])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setError(undefined)
      setIsLoading(false)
    }
  }, [])

  return { clustersByCategory, allMarkersBoundCenter, isLoading, error }
}

export default useMarkerData
