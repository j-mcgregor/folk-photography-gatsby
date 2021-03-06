import { faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'gatsby';
import * as React from 'react';

export interface LinkProps {
    content: string
    to: string
    subnav?: LinkProps[]
}

interface SideNavProps {
    logo?: string
    title: string
    options: LinkProps[]
    links: ContactMethod[]
}

interface ContactMethod {
    name: string
    url: {
        url: string
    }
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

const SideNav: React.FC<SideNavProps> = ({ logo, title, options, links }) => {

    return (
        <div className="sidenav">
            {logo && (
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
            )}
            {/* HIDE ON SMALL */}
            <h4>
                <Link to="/">{title}</Link>
            </h4>
            {options.map(nav => (
                <>
                    <span className="link-item" key={nav.to.replace(/ /g, '-')}>
                        <Link to={nav.to}>{nav.content}</Link>
                    </span>
                </>
            ))}
            {/* HIDE ON SMALL */}
            <div className="sidenav-footer">
                <div className="social-icons flex flex-column flex-center">
                    {links?.map(c => (
                        <Iconised key={c.url?.url} name={c.name} url={c.url?.url} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SideNav
