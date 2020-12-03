import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Button } from '../components/shared/Button'
import { DetailSlice, PackageSlice } from '../components/slices/PriceSlices'

export const AnimateOut = ({ threshold = 0.15, triggerOnce = false, isMatch = false, ...remainingProps }) => {
    const [ref, inView] = useInView({ threshold, triggerOnce })

    return (
        <input
            ref={ref}
            {...(isMatch && {
                style: {
                    // adjust these as desired
                    transition: 'opacity 800ms, transform 800ms',
                    opacity: inView ? 0 : 1,
                    transform: `translateY(${inView ? 100 : 0}px)`,
                },
            })}
            {...remainingProps}
        />
    )
}

export interface PricingBodyProps {
    id: string
    slice_type: string
    primary: {
        title: {
            raw: RichTextBlock[]
        }
        price: {
            raw: RichTextBlock[]
        }
        package: {
            raw: RichTextBlock[]
        }
        image: {
            url: string
            alt: null
            fluid: FluidObject
        }
        image_banner: {
            url: string
            alt: null
            fluid: FluidObject
        }
        description: {
            raw: RichTextBlock[]
        }
        button_link: {
            uid: string
        }
        button_label: {
            raw: RichTextBlock[]
        }
    }
}

interface PricingPageProps {
    data: {
        prismicPricing: {
            data: {
                pricing: {
                    raw: RichTextBlock[]
                }
                description: {
                    raw: RichTextBlock[]
                }
                body: PricingBodyProps[]
            }
        }
    }
}

export const query = graphql`
    {
        prismicPricing {
            data {
                pricing {
                    raw
                }
                description {
                    raw
                }
                body {
                    ... on PrismicPricingBodyDetailBanner {
                        id
                        slice_type
                        primary {
                            title {
                                raw
                            }
                            image_banner {
                                url
                                alt
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                            description {
                                raw
                            }
                            button_link {
                                uid
                            }
                            button_label {
                                raw
                            }
                        }
                    }
                    ... on PrismicPricingBodyPackageBanner {
                        id
                        slice_type
                        primary {
                            price {
                                raw
                            }
                            package {
                                raw
                            }
                            image {
                                url
                                alt
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                            description {
                                raw
                            }
                        }
                    }
                }
            }
        }
    }
`

const PricingContainer = styled.div<{ height?: string }>`
    height: ${({ height }) => (height ? `${height}vh` : '60vh')};
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 700px;
    text-align: justify;

    p {
        line-height: 2em;
    }

    @media only screen and (max-width: ${({ theme }) => theme.width.xl}) {
        padding: 3em;
        height: auto;
    }
    @media only screen and (max-width: ${({ theme }) => theme.width.md}) {
        padding: 1em;
        font-size: 16px;
        width: 80%;
    }
    @media only screen and (max-width: ${({ theme }) => theme.width.sm}) {
        padding: 10px;
        font-size: 14px;
        width: 100%;
    }
`

const renderSlices = (slice: PricingBodyProps, i: number) => {
    switch (slice.slice_type) {
        case 'package_banner':
            return <PackageSlice key={i} {...slice} index={i} />
        case 'detail_banner':
            return <DetailSlice key={i} {...slice} index={i} />
        default:
            return <div />
    }
}

const PricingPage: React.FC<PricingPageProps> = ({ data }) => {
    const {
        prismicPricing: {
            data: { pricing, description, body },
        },
    } = data

    return (
        <Layout>
            <SEO title="Pricing" />
            <PricingContainer className="container mt5">
                <RichText render={pricing?.raw} />
                <RichText render={description?.raw} />
            </PricingContainer>
            {body?.map(renderSlices)}
            <PricingContainer className="container text-center" height="20">
                <Button href="/contact">Contact Us</Button>
            </PricingContainer>
        </Layout>
    )
}

// @ts-ignore
export default PricingPage
