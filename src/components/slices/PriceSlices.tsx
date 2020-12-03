import Img from 'gatsby-image'
import { RichText } from 'prismic-reactjs'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

import { PricingBodyProps } from '../../pages/pricing'

const AnimateIn = ({ threshold = 0.15, triggerOnce = false, transition = 800, ...remainingProps }) => {
    const [ref, inView] = useInView({ threshold, triggerOnce })

    return (
        <div
            ref={ref}
            style={{
                // adjust these as desired
                transition: `opacity ${transition}ms, transform ${transition}ms`,
                opacity: inView ? 1 : 0,
                transform: `translateY(${inView ? 0 : 100}px)`,
            }}
            {...remainingProps}
        />
    )
}

const PackageBanner = styled(AnimateIn)`
    padding: 3em;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    margin: auto;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    .gatsby-image-wrapper {
        position: absolute;
        width: 100%;
        height: 90%;
        object-fit: contain;
    }

    @media only screen and (max-width: ${({ theme }) => theme.width.xl}) {
        padding: 0;
        height: auto;
        flex-direction: column;

        img {
            position: relative;
            width: 100%;
        }
    }
`

const DetailBanner = styled(AnimateIn)`
    height: 60vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 200px;

    .gatsby-image-wrapper {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    @media only screen and (max-width: ${({ theme }) => theme.width.xl}) {
        display: flex;
        flex-direction: column;
        position: relative;
        transform: none;
        height: auto;
        margin: 0;
    }
`

export const TitleContainer = styled.div<{ left?: boolean; center?: boolean }>`
    position: absolute;
    background: ${({ theme }) => theme.palette.white};
    padding: 3em 4em;
    top: 50%;
    max-width: 600px;
    ${({ left }) => (left ? { left: 0 } : { right: 0 })};
    transform: translate(${({ left }) => (left ? '0, -50%' : '10%, -50%')});
    text-align: ${({ left }) => (left ? 'left' : 'right')};
    text-align: center;
    ${({ center }) =>
        center && { left: 0, right: 0, transform: 'translateY(50%)', width: '60%', margin: 'auto' }}

    h2, p {
        width: 100%;
        margin: auto;
        line-height: 1.8em;
    }
    h2 {
        font-size: 1.2em;
    }

    p {
        font-size: 0.8em;
    }

    @media only screen and (max-width: ${({ theme }) => theme.width.xl}) {
        display: flex;
        flex-direction: column;
        position: relative;
        transform: none;
        width: 80%;
    }
    @media only screen and (max-width: ${({ theme }) => theme.width.sm}) {
        width: 100%;
    }
`

export const PackageSlice: React.FC<PricingBodyProps & { index: number }> = ({ primary, index }) => {
    return (
        <PackageBanner className="package_banner" triggerOnce={true}>
            <Img fluid={primary.image.fluid} alt="" />
            <TitleContainer left={index % 2 !== 0}>
                <RichText render={primary.package.raw} />
                <RichText render={primary.price.raw} />
                <RichText render={primary.description.raw} />
            </TitleContainer>
        </PackageBanner>
    )
}

export const DetailSlice: React.FC<PricingBodyProps & { index: number }> = ({ primary, index }) => {
    return (
        <DetailBanner className="detail_banner" triggerOnce={true}>
            <Img fluid={primary.image_banner.fluid} alt="" />
            <TitleContainer center>
                <RichText render={primary.title.raw} />
                <RichText render={primary.description.raw} />
            </TitleContainer>
        </DetailBanner>
    )
}
