import * as React from 'react'
import styled from 'styled-components'

interface BannerProps {
    text?: string
}

const StyledBanner = styled.div`
    font-family: 'Raleway-Thin';
    width: 700px;
    text-align: center;
    font-weight: 600;

    h2 {
        text-transform: uppercase;
    }

    p {
        line-height: 1.5em;

        a {
            color: red;
        }
    }
    @media only screen and (max-width: 768px) {
        width: 100%;
    }
`

const Banner: React.FC<BannerProps> = ({ children }) => {
    return <StyledBanner className="banner container p3">{children}</StyledBanner>
}

export default Banner
