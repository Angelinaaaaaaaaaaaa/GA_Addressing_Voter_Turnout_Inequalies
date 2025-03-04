import { Github, Home, Map } from 'lucide-react'
import { AppConfig, NavMenuVariant } from '#lib/AppConfig'

import NavMenuItem from './NavMenuItem'

interface NavMenuProps {
  variant?: NavMenuVariant
}

const NavMenu = ({ variant = NavMenuVariant.INTRO }: NavMenuProps) => {
  const navIconSize =
    variant === NavMenuVariant.TOPNAV ? AppConfig.ui.topBarIconSize : AppConfig.ui.menuIconSize

  const listStyle =
    variant === NavMenuVariant.TOPNAV
      ? 'flex h-full items-center gap-4'
      : 'flex flex-col justify-between gap-1 w-fit'

  return (
    <nav className="h-full">
      <ul className={listStyle}>
        <NavMenuItem 
          href="/" 
          label="Intro" 
          icon={<Home size={navIconSize} className="text-purple-400 hover:text-purple-300" />} 
        />
        <NavMenuItem 
          href="/map" 
          label="Map" 
          icon={<Map size={navIconSize} className="text-purple-400 hover:text-purple-300" />} 
        />
        <NavMenuItem
          href="https://github.com/Angelinaaaaaaaaaaaa/GA_Addressing_Voter_Turnout_Inequalies"
          label="Github"
          icon={<Github size={navIconSize} className="text-purple-400 hover:text-purple-300" />}
          external
        />
      </ul>
    </nav>
  )
}

export default NavMenu
