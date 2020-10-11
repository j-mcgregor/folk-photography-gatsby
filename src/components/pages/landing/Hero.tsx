import * as React from 'react'
import styled from 'styled-components'

import { Breakpoints, HeroProps, StyledHeroProps } from '../../../types/enums'

const StyledHero = styled.div<StyledHeroProps>`
    background: ${({ bgImageUrl }) => `url(${bgImageUrl})`};
    background-size: cover;
    background-position: right center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    height: 100vh;
    text-transform: uppercase;
    animation: fadeIn 0.5s ease-in;

    h3 {
        font-family: 'Abel', sans-serif;
    }

    @media screen and (max-width: ${Breakpoints.md}px) {
        height: 600px;
    }
    @media screen and (max-width: ${Breakpoints.sm}px) {
        height: 500px;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`

const Hero: React.FC<HeroProps> = ({ logo, backgroundImage }) => {
    return (
        backgroundImage && (
            <StyledHero bgImageUrl={backgroundImage} className="flex flex-column flex-center">
                {logo || null}
            </StyledHero>
        )
    )
}

export default Hero
