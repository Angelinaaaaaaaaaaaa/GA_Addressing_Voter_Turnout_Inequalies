import { LucideProps, Eye, EyeOff, RotateCcw } from 'lucide-react'
import { FunctionComponent, useState, useCallback } from 'react'
import MarkerCategories, { Category } from '#lib/MarkerCategories'
import LegendIcon from './LegendIcon'

interface MapLegendProps {
  onCategoryToggle: (category: Category, visible: boolean) => void
  hiddenCategories: Category[]
  onShowAll: () => void
  onReset: () => void
}

const MapLegend = ({ onCategoryToggle, hiddenCategories, onShowAll, onReset }: MapLegendProps) => {
  const handleCategoryClick = useCallback((category: Category) => {
    const isCurrentlyHidden = hiddenCategories.includes(category)
    onCategoryToggle(category, isCurrentlyHidden)
  }, [hiddenCategories, onCategoryToggle])

  return (
    <div className="absolute bottom-4 left-4 z-[1000] max-w-[240px] rounded-lg bg-white p-2 shadow-lg">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-bold" style={{ color: '#000' }}>Polling Place Categories</h3>
        <div className="flex gap-2">
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Show All Categories"
            onClick={onShowAll}
          >
            <Eye size={16} />
          </button>
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            title="Reset to Default View"
            onClick={onReset}
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-1">
        {Object.entries(MarkerCategories).map(([categoryStr, { name, icon, color }]) => {
          const category = Number(categoryStr) as Category
          const isHidden = hiddenCategories.includes(category)
          return (
            <div 
              key={categoryStr} 
              className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 rounded px-1"
              onClick={() => handleCategoryClick(category)}
            >
              <LegendIcon 
                icon={icon as FunctionComponent<LucideProps>} 
                color={isHidden ? '#9CA3AF' : color} 
              />
              <span 
                className="text-xs" 
                style={{ color: isHidden ? '#9CA3AF' : '#000' }}
              >
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