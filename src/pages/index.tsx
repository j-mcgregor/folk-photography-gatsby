import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import Banner from '../components/pages/landing/Banner'
import Hero from '../components/pages/landing/Hero'
import SEO from '../components/SEO'

export const query = graphql`
    query IndexPageQuery {
        prismicLanding {
            data {
                primary_text {
                    raw
                }
                secondary_text {
                    raw
                }
                about {
                    raw
                }
                background_image {
                    url
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
                    }
                }
                body {
                    ... on PrismicLandingBodyQuote {
                        id
                        primary {
                            quote {
                                raw
                            }
                            name_of_the_author {
                                raw
                            }
                        }
                    }

                    ... on PrismicLandingBodyText {
                        id
                        primary {
                            text_block {
                                raw
                            }
                        }
                    }
                    ... on PrismicLandingBodyKeySection {
                        items {
                            key_title1 {
                                raw
                            }
                            key_subtitle1 {
                                raw
                            }
                            key_subtext1 {
                                raw
                            }
                            key_coverage1 {
                                raw
                            }
                        }
                    }
                }
            }
        }

        file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "folk-photography-logo-white.png" }) {
            childImageSharp {
                fluid(maxWidth: 600) {
                    base64
                    src
                    srcSet
                }
            }
        }
    }
`

interface KeySlice {
    key_title1: {
        raw: RichTextBlock[]
    }
    key_subtitle1: {
        raw: RichTextBlock[]
    }
    key_subtext1: {
        raw: RichTextBlock[]
    }
    key_coverage1: {
        raw: RichTextBlock[]
    }
}

interface IndexPageProps {
    data: {
        prismicLanding: {
            data: {
                primary_text: {
                    raw: RichTextBlock[]
                }
                secondary_text: {
                    raw: RichTextBlock[]
                }
                about: {
                    raw: RichTextBlock[]
                }
                background_image: {
                    url: string
                    fluid: FluidObject
                }

                body: {
                    id: string
                    __typename: string
                    items: KeySlice[]
                    primary: {
                        quote: {
                            raw: RichTextBlock[]
                        }
                        name_of_the_author: {
                            raw: RichTextBlock[]
                        }
                        text_block: {
                            raw: RichTextBlock[]
                        }
                    }
                }[]
            }
        }
        file: {
            childImageSharp: {
                fluid: FluidObject
            }
        }
    }
}

const StyledHomePage = styled.div`
    width: 100%;

    p {
        /* line-height: 2em; */
        margin: 4em 0;
    }

    .text-section p {
        line-height: 2em;
        font-weight: 100;
    }

    .key-section {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        font-weight: 100;
        padding: 2em 0;

        p {
            margin: 0;
        }
    }

    .quote-block {
        width: 100%;
        margin: 4em auto 0;
        color: #555;
        font-size: 1.2em;

        .quote {
            display: inline-flex;
            text-align: center;
            align-items: center;
            justify-content: center;
            position: relative;
            quotes: '“' '”';
            &::before,
            &::after {
                position: absolute;
                font-size: 4em;
                top: 50%;
                transform: translateY(-50%);
            }

            &::before {
                content: open-quote;
                left: 0;
            }
            &::after {
                content: close-quote;
                right: 0;
            }
            p {
                padding: 0 2em;
            }
        }
        .quote-author {
            /* font-size: 0.7em; */
            p {
                padding: 0;
                margin: 0;
            }
        }
    }
`

const StyledImg = styled(Img)`
    width: 600px;
    height: 600px;

    @media only screen and (max-width: 768px) {
        width: 300px;
        height: 300px;
    }
    @media only screen and (max-width: 576px) {
        width: 200px;
        height: 200px;
    }
`

const IndexPage: React.FC<IndexPageProps> = ({ data: { prismicLanding, file } }) => {
    const { primary_text, secondary_text, background_image, body } = prismicLanding.data

    // @ts-ignore
    const logo = <StyledImg fluid={file.childImageSharp?.fluid} alt="Logo" id="logo" />

    const KeySectionSlice: React.FC<{ item: KeySlice }> = ({ item }) => (
        <div className="key-section">
            <div className="">
                <RichText render={item.key_title1?.raw} />
            </div>
            <div className="text-secondary">
                <RichText render={item.key_subtitle1?.raw} />
            </div>
            <div className="">
                <RichText render={item.key_subtext1?.raw} />
            </div>
            <div className="font-italic">
                <RichText render={item.key_coverage1?.raw} />
            </div>
        </div>
    )

    return (
        <Layout>
            <SEO title="Home" />
            <StyledHomePage>
                <Hero logo={logo} backgroundImage={background_image.fluid} />
                <Banner>
                    {primary_text && <RichText render={primary_text.raw} />}
                    {secondary_text && <RichText render={secondary_text.raw} />}
                    {body.map((b, i) => {
                        switch (b.__typename) {
                            case 'PrismicLandingBodyKeySection':
                                return <KeySectionSlice item={b.items[0]} />
                            case 'PrismicLandingBodyQuote':
                                return (
                                    <div className="quote-block text-cursive">
                                        <div className="quote">
                                            <RichText render={b.primary.quote.raw} key={i} />
                                        </div>
                                        <div className="quote-author">
                                            <RichText render={b.primary.name_of_the_author.raw} key={i} />
                                        </div>
                                    </div>
                                )

                            case 'PrismicLandingBodyText':
                                return (
                                    <div className="text-section">
                                        <RichText render={b.primary.text_block.raw} key={i} />
                                    </div>
                                )
                            default:
                                return null
                        }
                    })}
                </Banner>
            </StyledHomePage>
        </Layout>
    )
}
export default IndexPage
