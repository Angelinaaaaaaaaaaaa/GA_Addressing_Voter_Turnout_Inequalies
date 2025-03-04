import { LucideProps } from 'lucide-react'
import { FunctionComponent } from 'react'

interface LegendIconProps {
  icon: FunctionComponent<LucideProps>
  color: string
}

const LegendIcon = ({ icon: Icon, color }: LegendIconProps) => {
  return (
    <div className="flex items-center justify-center">
      <Icon size={16} color={color} />
    </div>
  )
}

export default LegendIcon 