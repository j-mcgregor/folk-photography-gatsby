import { Link } from 'gatsby'
import * as React from 'react'

interface LinkProps {
  content: string
  to: string
}

interface SideNavProps {
  title: string
  options: LinkProps[]
}

const SideNav: React.FC<SideNavProps> = ({ title, options }) => {
  return (
    <div className="sidenav">
      <h4>
        <Link to="/">{title}</Link>
      </h4>
      {options.map(nav => (
        <Link key={nav.to.replace(/ /g, '-')} to={nav.to}>
          {nav.content}
        </Link>
      ))}
    </div>
  )
}

export default SideNav
