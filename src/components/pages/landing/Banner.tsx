import * as React from 'react'
import styled from 'styled-components'

interface BannerProps {
    text?: string
}

const StyledBanner = styled.div`
    font-family: 'Raleway-Thin';

    h2 {
        text-transform: uppercase;
    }
`

const Banner: React.FC<BannerProps> = ({ children }) => {
    return <StyledBanner className="container p3">{children}</StyledBanner>
}

export default Banner
