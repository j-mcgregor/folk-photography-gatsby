import {
  faEtsy,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

export interface ContactMethod {
  name: string
  link: {
    url: string
  }
}

interface FooterProps {
  links: ContactMethod[]
}

enum ContactIcon {
  FACEBOOK = 'Facebook',
  TWITTER = 'Twitter',
  ETSY = 'Etsy',
}

const Iconised = ({ name, url }: { name: string; url: string }) => {
  switch (name) {
    case ContactIcon.FACEBOOK:
      return (
        <a href={url} className="facebook">
          <FontAwesomeIcon size="sm" icon={faFacebook} />
        </a>
      )
    case ContactIcon.TWITTER:
      return (
        <a href={url} className="twitter">
          <FontAwesomeIcon size="sm" icon={faTwitter} />
        </a>
      )
    case ContactIcon.ETSY:
      return (
        <a href={url} className="etsy">
          <FontAwesomeIcon size="sm" icon={faEtsy} />
        </a>
      )
    default:
      break
  }
}

const Footer: React.FC<FooterProps> = ({ links }) => {
  return (
    <div className="site-footer flex flex-row flex-center">
      <div className="social-icons">
        {links.map(c => (
          <Iconised key={c.link.url} name={c.name} url={c.link.url} />
        ))}
      </div>
    </div>
  )
}

export default Footer
