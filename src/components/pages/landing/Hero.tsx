import BackgroundImage from 'gatsby-background-image'
import * as React from 'react'

import { HeroProps } from '../../../types/enums'

const Hero: React.FC<HeroProps> = ({ logo, backgroundImage }) => {
    return (
        backgroundImage && (
            <BackgroundImage fluid={backgroundImage} className="flex flex-column flex-center hero" fadeIn>
                {logo}
            </BackgroundImage>
        )
    )
}

export default Hero
