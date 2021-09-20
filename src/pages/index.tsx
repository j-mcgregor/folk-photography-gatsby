import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import { FixedObject, FluidObject } from 'gatsby-image'

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
                key_title {
                    raw
                }
                key_subtitle {
                    raw
                }
                key_subtext {
                    raw
                }
                key_coverage {
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
                key_title: {
                    raw: RichTextBlock[]
                }
                key_subtitle: {
                    raw: RichTextBlock[]
                }
                key_subtext: {
                    raw: RichTextBlock[]
                }
                key_coverage: {
                    raw: RichTextBlock[]
                }
                body: {
                    id: string
                    primary: {
                        quote: { raw: RichTextBlock[] }
                        name_of_the_author: { raw: RichTextBlock[] }
                        text_block: { raw: RichTextBlock[] }
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
    font-weight: bold;
    width: 100%;
    p {
        line-height: 2em;
        margin: 4em 0;
    }

    .key-section {
        border-top: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        padding: 2em 0;
        p {
            margin: 0;
        }
        .text-cursive {
            font-size: 2em;
        }
    }
    .quote-block {
        width: 100%;
        margin: 4em auto;
        color: #555;
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
            font-size: 14px;
        }
        p {
            font-family: 'Raleway-Thin';
            font-style: italic;
            margin: 0 auto;
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
    const {
        primary_text,
        secondary_text,
        background_image,
        key_title,
        key_subtitle,
        key_subtext,
        key_coverage,
        body,
    } = prismicLanding.data

    // @ts-ignore
    const logo = <StyledImg fluid={file.childImageSharp?.fluid} alt="Logo" id="logo" />

    const key_section = (
        <div className="key-section">
            <div className="text-gold h3-style">
                <RichText render={key_title?.raw} />
            </div>
            <div className="text-secondary text-uppercase ">
                <RichText render={key_subtitle?.raw} />
            </div>
            <div className="text-cursive">
                <RichText render={key_subtext?.raw} />
            </div>
            <div className="font-italic">
                <RichText render={key_coverage?.raw} />
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
                    {key_section && key_section}
                    {body.map((b, i) => (
                        <>
                            {b.primary.quote && (
                                <div className="quote-block">
                                    <div className="quote">
                                        <RichText render={b.primary.quote.raw} key={i} />
                                    </div>
                                    <div className="quote-author">
                                        <RichText render={b.primary.name_of_the_author.raw} key={i} />
                                    </div>
                                </div>
                            )}
                            {b.primary.text_block && <RichText render={b.primary.text_block.raw} key={i} />}
                        </>
                    ))}
                </Banner>
            </StyledHomePage>
        </Layout>
    )
}
export default IndexPage
