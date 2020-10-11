import * as React from 'react'

import { HeroProps } from '../../../types/enums'

const Hero: React.FC<HeroProps> = ({ logo, backgroundImage }) => {
    return (
        backgroundImage && (
            <div
                className="flex flex-column flex-center hero"
                style={{
                    backgroundImage: `url(${backgroundImage})`,
                }}
            >
                {logo}
            </div>
        )
    )
}

export default Hero
