import Link from 'next/link'
import { ReactNode } from 'react'

interface NavMenuItemProps {
  href: string
  label: string
  icon: ReactNode
  external?: boolean
}

const NavMenuItem = ({ href, label, icon, external }: NavMenuItemProps) => {
  if (external) {
    return (
      <li className="flex h-full items-center">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-full items-center"
          title={label}
        >
          {icon}
        </a>
      </li>
    )
  }

  return (
    <li className="flex h-full items-center">
      <Link href={href} className="flex h-full items-center" title={label}>
        {icon}
      </Link>
    </li>
  )
}

export default NavMenuItem
