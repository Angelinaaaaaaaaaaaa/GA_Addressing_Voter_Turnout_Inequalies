import Leaflet from 'leaflet'
import { Compass } from 'lucide-react'
import { useEffect, useState } from 'react'

import useMapContext from '#components/Map/useMapContext'

const LatLngLogo = () => {
  const { map } = useMapContext()
  const [location, setLocation] = useState<Leaflet.LatLng | undefined>()
  const lat = location?.lat.toFixed(4)
  const lng = location?.lng.toFixed(4)

  useEffect(() => {
    if (!map) return undefined

    setLocation(map.getCenter())

    const handleMove = () => {
      setLocation(map.getCenter())
    }

    map.on('move', handleMove)

    return () => {
      map.off('move', handleMove)
    }
  }, [map])

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center">
        <Compass size={20} className="text-purple-400" />
      </div>
      <div className="flex items-center text-xs font-medium">
        <span className="text-purple-300">Lat: {lat}, Lng: {lng}</span>
      </div>
    </div>
  )
}

export default LatLngLogo
