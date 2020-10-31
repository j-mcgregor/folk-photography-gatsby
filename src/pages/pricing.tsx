import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

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
    PricingContainer: styled.div`
        height: 60vh;
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
    PackageBanner: styled.div`
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
        padding: 3em 6em;
        top: 50%;
        ${({ left }) => (left ? { left: 0 } : { right: 0 })};
        transform: translate(${({ left }) => (left ? '25%, -50%' : '-25%, -50%')});
        text-align: ${({ left }) => (left ? 'left' : 'right')};
        text-align: center;
        ${({ center }) => center && { left: 0, right: 0, transform: 'none', width: '60%', margin: 'auto' }}

        h2 {
            font-size: 2em;
        }

        ul {
            ${({ center }) => center && { fontSize: '0.8em' }}
            list-style: none;
            padding: 0;
            li {
                line-height: 2em;
            }
        }
    `,
    DetailBanner: styled.div`
        height: 60vh;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 600px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    `,
}

const renderSlices = (slice: PricingBodyProps, i: number) => {
    switch (slice.slice_type) {
        case 'package_banner':
            return (
                <S.PackageBanner className="package_banner">
                    <img
                        src={slice.primary.image.url}
                        alt=""
                        data-sal="slide-up"
                        data-sal-duration="500"
                        data-sal-delay="200"
                        data-sal-easing="ease"
                    />
                    <S.TitleContainer
                        left={i % 2 !== 0}
                        data-sal="fade"
                        data-sal-duration="300"
                        data-sal-easing="ease"
                    >
                        <RichText render={slice.primary.package.raw} />
                        <RichText render={slice.primary.price.raw} />
                        <RichText render={slice.primary.description.raw} />
                    </S.TitleContainer>
                </S.PackageBanner>
            )
        case 'detail_banner':
            return (
                <S.DetailBanner className="detail_banner">
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
    console.log(body[body.length - 1])
    return (
        <Layout>
            <SEO title="Pricing" />
            <S.PricingContainer className="container mt5">
                <RichText render={pricing?.raw} />
                <RichText render={description?.raw} />
            </S.PricingContainer>
            {body.map(renderSlices)}
        </Layout>
    )
}

export default PricingPage
