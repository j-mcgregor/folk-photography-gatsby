import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import createKey from './createKey'

export const createLink = (type: string, url: string, target = false) => {
    const targetProps = target
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : {}

    switch (type) {
        case 'Facebook':
            return (
                <a href={url} {...targetProps} key={createKey(type)}>
                    <FontAwesomeIcon icon={faFacebook} />
                </a>
            )
        case 'LinkedIn':
            return (
                <a href={url} {...targetProps} key={createKey(type)}>
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </a>
            )
        case 'Mail':
            return (
                <a href={url} {...targetProps} key={createKey(type)}>
                    <FontAwesomeIcon icon={faEnvelope} />
                </a>
            )
        case 'Phone':
            return (
                <a href={url} {...targetProps} key={createKey(type)}>
                    <FontAwesomeIcon icon={faPhone} />
                </a>
            )
        default:
            return null
    }
}
