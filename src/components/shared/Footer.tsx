import { faEtsy, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as React from 'react'

export interface ContactMethod {
    name: string
    url: {
        url: string
    }
}

interface FooterProps {
    links: ContactMethod[]
}

enum ContactIcon {
    FACEBOOK = 'Facebook',
    TWITTER = 'Twitter',
    MAIL = 'Mail',
    PHONE = 'Phone',
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
        case ContactIcon.MAIL:
            return (
                <a href={url} className="etsy">
                    <FontAwesomeIcon size="sm" icon={faEnvelope} />
                </a>
            )
        case ContactIcon.PHONE:
            return (
                <a href={url} className="phone">
                    <FontAwesomeIcon size="sm" icon={faPhone} />
                </a>
            )
        default:
            return <span />
    }
}

const Footer: React.FC<FooterProps> = ({ links }) => {
    return (
        <div className="site-footer flex flex-row flex-center">
            <div className="social-icons">
                {links?.map(c => (
                    <Iconised key={c.url?.url} name={c.name} url={c.url?.url} />
                ))}
            </div>
        </div>
    )
}

export default Footer
