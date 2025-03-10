import dynamic from 'next/dynamic'
import {useCallback, useMemo} from 'react'
import {Marker as ReactMarker} from 'react-leaflet'

import {AppConfig} from '#lib/AppConfig'
import MarkerCategories from '#lib/MarkerCategories'
import {PlaceValues} from '#lib/Places'

import LeafletDivIcon from '../LeafletDivIcon'
import useMapContext from '../useMapContext'
import MarkerIconWrapper from './MarkerIconWrapper'

const LeafletPopup = dynamic(() => import('../LeafletPopup'))

const MARKER_COLOR = "#3B82F6"

export interface CustomMarkerProps {
    place: PlaceValues
}

export const CustomMarker = ({place}: CustomMarkerProps) => {
    const {map} = useMapContext()
    const markerCategory = useMemo(() => MarkerCategories[place.category], [place.category])

    const handlePopupClose = useCallback(() => {
        if (!map) return
        map?.closePopup()
    }, [map])

    const handleMarkerClick = useCallback(() => {
        if (!map) return
        const currentCenter = map.getCenter()
        const targetPos = Array.isArray(place.position) 
            ? place.position 
            : [place.position.lat, place.position.lng]
        
        // Only pan if the marker is not already centered
        if (currentCenter.lat !== targetPos[0] || currentCenter.lng !== targetPos[1]) {
            map.panTo(place.position, {
                animate: true,
                duration: 0.5
            })
        }
    }, [map, place.position])

    // some event for the inner popup cta
    const handleOpenLocation = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log('open location')
    }, [])

    return (
        <ReactMarker
            position={place.position}
            icon={LeafletDivIcon({
                source: <MarkerIconWrapper color={MARKER_COLOR} icon={markerCategory.icon}/>,
                anchor: [AppConfig.ui.markerIconSize / 2, AppConfig.ui.markerIconSize / 2],
            })}
            eventHandlers={{click: handleMarkerClick}}
            autoPan={false}
            autoPanOnFocus={false}
        >
            <LeafletPopup
                autoPan={false}
                autoClose
                closeButton={false}
                item={place}
                color={MARKER_COLOR}
                icon={markerCategory.icon}
                handleOpenLocation={handleOpenLocation}
                handlePopupClose={handlePopupClose}
            />
        </ReactMarker>
    )
}
