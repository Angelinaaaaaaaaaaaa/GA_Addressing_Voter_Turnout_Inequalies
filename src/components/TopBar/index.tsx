import LatLngLogo from '#components/TopBar/LatLngLogo'
import {NavMenuVariant} from '#lib/AppConfig'

import NavMenu from '../common/NavMenu'

const MapTopBar = () => (
    <div
        className="absolute left-0 top-0 flex h-8 w-full items-center justify-between bg-gray-900/90 px-4 backdrop-blur-sm"
        style={{zIndex: 1000}}
    >
        <LatLngLogo/>
        <NavMenu variant={NavMenuVariant.TOPNAV}/>
    </div>
)

export default MapTopBar
