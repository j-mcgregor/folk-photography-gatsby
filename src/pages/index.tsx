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
                background_image {
                    url
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
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
    p {
        line-height: 2em;
        text-align: justify;
        padding-right: 2em;
    }
`

const StyledImg = styled(Img)`
    width: 600px;
    height: 600px;

    @media only screen and (max-width: 360px) {
        width: 300px;
        height: 300px;
    }
`

const IndexPage: React.FC<IndexPageProps> = ({ data: { prismicLanding, file } }) => {
    const { primary_text, secondary_text, about, background_image } = prismicLanding.data

    // @ts-ignore
    const logo = <StyledImg fluid={file.childImageSharp?.fluid} alt="Logo" />

    return (
        <Layout>
            <SEO title="Home" />
            <StyledHomePage>
                <Hero logo={logo} backgroundImage={background_image.fluid} />
                <Banner>
                    {primary_text && <RichText render={primary_text.raw} />}
                    {secondary_text && <RichText render={secondary_text.raw} />}
                    {about && <RichText render={about.raw} />}
                </Banner>
            </StyledHomePage>
        </Layout>
    )
}
export default IndexPage
