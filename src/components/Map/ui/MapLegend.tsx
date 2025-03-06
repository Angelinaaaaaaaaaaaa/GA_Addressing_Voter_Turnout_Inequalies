import { LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import LegendIcon from './LegendIcon'

const MapLegend = () => {
  return (
    <div className="absolute bottom-4 left-4 z-[1000] max-w-[240px] rounded-lg bg-white p-2 shadow-lg">
      <h3 className="mb-1 text-xs font-bold" style={{ color: '#000' }}>Polling Place Categories</h3>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {Object.entries(MarkerCategories).map(([categoryStr, { name, icon, color }]) => {
          // const category = Number(categoryStr) as Category
          return (
            <div key={categoryStr} className="flex items-center gap-1">
              <LegendIcon icon={icon as FunctionComponent<LucideProps>} color={color} />
              <span className="text-xs" style={{ color: '#000' }}>
                {name}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MapLegend 