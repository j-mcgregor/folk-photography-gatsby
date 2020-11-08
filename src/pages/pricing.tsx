import { graphql, Link } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import { useInView } from 'react-intersection-observer'
import styled, { withTheme } from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const AnimateIn = ({ threshold = 0.15, triggerOnce = false, ...remainingProps }) => {
    const [ref, inView] = useInView({ threshold, triggerOnce })

    return (
        <div
            ref={ref}
            style={{
                // adjust these as desired
                transition: 'opacity 800ms, transform 800ms',
                opacity: inView ? 1 : 0,
                transform: `translateY(${inView ? 0 : 100}px)`,
            }}
            {...remainingProps}
        />
    )
}

interface PricingBodyProps {
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
        }
        image_banner: {
            url: string
            alt: null
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

const S = {
    PricingContainer: styled.div<{ height?: string }>`
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
    `,
    CardContainer: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 800px;
        margin: auto;
    `,
    Card: styled.div`
        width: 30%;
        padding: 1em;
        height: 500px;
        border: 1px solid grey;
    `,
    PackageBanner: styled(AnimateIn)`
        padding: 3em;
        height: 100vh;
        width: 100%;
        overflow: hidden;
        margin: auto;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            position: absolute;
            width: 70%;
            object-fit: contain;
        }
    `,
    TitleContainer: styled.div<{ left?: boolean; center?: boolean }>`
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
    `,
    DetailBanner: styled(AnimateIn)`
        height: 60vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 200px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `,
    Button: styled.a`
        margin: 5em auto;
        padding: 1em 3em;
        border: 1px solid ${({ theme }) => theme.palette.center};
        color: ${({ theme }) => theme.palette.center};
    `,
}

const renderSlices = (slice: PricingBodyProps, i: number) => {
    switch (slice.slice_type) {
        case 'package_banner':
            return (
                <S.PackageBanner className="package_banner" triggerOnce={true}>
                    <img src={slice.primary.image.url} alt="" />
                    <S.TitleContainer left={i % 2 !== 0}>
                        <RichText render={slice.primary.package.raw} />
                        <RichText render={slice.primary.price.raw} />
                        <RichText render={slice.primary.description.raw} />
                    </S.TitleContainer>
                </S.PackageBanner>
            )
        case 'detail_banner':
            return (
                <S.DetailBanner className="detail_banner" triggerOnce={true}>
                    <img src={slice.primary.image_banner.url} alt="" />
                    <S.TitleContainer center>
                        <RichText render={slice.primary.title.raw} />
                        <RichText render={slice.primary.description.raw} />
                    </S.TitleContainer>
                </S.DetailBanner>
            )
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
            <S.PricingContainer className="container mt5">
                <RichText render={pricing?.raw} />
                <RichText render={description?.raw} />
            </S.PricingContainer>
            {body?.map(renderSlices)}
            <S.PricingContainer className="container text-center" height="20">
                <S.Button href="/contact">Contact Us</S.Button>
            </S.PricingContainer>
        </Layout>
    )
}

// @ts-ignore
export default withTheme(PricingPage)
