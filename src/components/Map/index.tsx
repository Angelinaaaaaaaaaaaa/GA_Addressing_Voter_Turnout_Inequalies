import Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import { useEffect, useState, useCallback } from 'react'
import { useResizeDetector } from 'react-resize-detector'
import debounce from 'lodash/debounce'

import MapTopBar from '#components/TopBar'
import { AppConfig } from '#lib/AppConfig'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import { Places, PlacesType } from '#lib/Places'

import LeafleftMapContextProvider from './LeafletMapContextProvider'
import useMapContext from './useMapContext'
import useMarkerData from './useMarkerData'
import MapLegend from './ui/MapLegend'
import StateBoundary from './StateBoundary'

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

export interface ViewState {
  minLat: number
  minLng: number
  maxLat: number
  maxLng: number
  zoomLevel: number
}

const getViewState: (map?: Leaflet.Map) => ViewState | undefined = (map?: Leaflet.Map) => {
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

interface MapProps {
  onClustersChange?: (clusters: Record<Category, PlacesType>) => void;
}

const LeafletMapInner: React.FC<MapProps> = ({ onClustersChange }) => {
  // Initial state: hide all categories except BLANK (Unclassified)
  const initialHiddenCategories = Object.values(Category)
    .filter(category => category !== Category.BLANK)
    .map(category => category as Category)

  const [hiddenCategories, setHiddenCategories] = useState<Category[]>(initialHiddenCategories)
  const { width: viewportWidth, height: viewportHeight, ref: viewportRef } = useResizeDetector()
  const { map } = useMapContext()
  const [viewState, setViewState] = useState(getViewState(map))

  const handleCategoryToggle = useCallback((category: Category, visible: boolean) => {
    setHiddenCategories(prev => 
      visible 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }, [])

  const handleShowAll = useCallback(() => {
    setHiddenCategories([])
  }, [])

  const handleReset = useCallback(() => {
    setHiddenCategories(initialHiddenCategories)
  }, [])

  // Debounced view state update
  const handleMapMoveEnd = useCallback(
    debounce(() => {
      setViewState(getViewState(map))
    }, 250),
    [map]
  )

  const markerQueryResponse = Places as PlacesType | undefined
  if (!markerQueryResponse) {
    console.warn('Places data is undefined')
  }

  useEffect(() => {
    if (!map) return undefined

    map.on('moveend', handleMapMoveEnd)

    return () => {
      map.off('moveend', handleMapMoveEnd)
      handleMapMoveEnd.cancel()
    }
  }, [map, handleMapMoveEnd])

  const { clustersByCategory, allMarkersBoundCenter } = useMarkerData({
    locations: markerQueryResponse,
    map,
    viewportWidth,
    viewportHeight,
  })

  // Update parent component with current clusters
  useEffect(() => {
    if (clustersByCategory && onClustersChange) {
      onClustersChange(clustersByCategory);
    }
  }, [clustersByCategory, onClustersChange]);

  const isLoading = !map || !viewportWidth || !viewportHeight

  /** watch position & zoom of all markers */
  useEffect(() => {
    if (!allMarkersBoundCenter || !map) return

    const moveEnd = () => {
      map.off('moveend', moveEnd)
    }

    map.flyTo(allMarkersBoundCenter.centerPos, allMarkersBoundCenter.minZoom, { animate: false })
    map.once('moveend', moveEnd)
  }, [allMarkersBoundCenter, map])

  return (
    <div
      className="absolute w-full overflow-hidden"
      ref={viewportRef}
      style={{ height: 'calc(100vh - 240px)' }}
    >
      <MapTopBar />
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
                  <StateBoundary />
                  <CenterToMarkerButton
                    center={allMarkersBoundCenter.centerPos}
                    zoom={allMarkersBoundCenter.minZoom}
                  />
                  <LocateButton />
                  {Object.entries(clustersByCategory).map(([categoryStr, markers]) => {
                    const category = Number(categoryStr) as Category;
                    if (hiddenCategories.includes(category)) {
                      return null;
                    }
                    return (
                      <LeafletCluster
                        key={category}
                        icon={MarkerCategories[category].icon}
                        color={MarkerCategories[category].color}
                        chunkedLoading
                      >
                        {markers.map((marker) => (
                          <CustomMarker place={marker} key={marker.id} />
                        ))}
                      </LeafletCluster>
                    );
                  })}
                  <MapLegend 
                    onCategoryToggle={handleCategoryToggle}
                    hiddenCategories={hiddenCategories}
                    onShowAll={handleShowAll}
                    onReset={handleReset}
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

// pass through to get context in <MapInner>
const Map: React.FC<MapProps> = (props) => (
  <LeafleftMapContextProvider>
    <LeafletMapInner {...props} />
  </LeafleftMapContextProvider>
)

export default Map
