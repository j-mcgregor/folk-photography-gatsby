import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

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
                }
            }
        }

        file(sourceInstanceName: { eq: "images" }, relativePath: { eq: "folk photography logo white.png" }) {
            childImageSharp {
                fixed(width: 600, height: 600) {
                    base64
                    width
                    height
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
                }
            }
        }
        file: {
            childImageSharp: {
                fixed: {
                    height: number
                    width: number
                    base64: string
                    src: string
                    srcSet: string
                }
            }
        }
    }
}

const IndexPage: React.FC<IndexPageProps> = ({ data: { prismicLanding, file } }) => {
    const { primary_text, secondary_text, about, background_image } = prismicLanding.data

    const backgroundImage: string = background_image?.url

    const logo = file?.childImageSharp.fixed && <Img fixed={file.childImageSharp.fixed} alt="Logo" />

    return (
        <Layout>
            <SEO title="Home" />
            <Hero logo={logo} backgroundImage={backgroundImage} />
            <Banner>
                {primary_text && <RichText render={primary_text.raw} />}
                {secondary_text && <RichText render={secondary_text.raw} />}
                {about && <RichText render={about.raw} />}
            </Banner>
        </Layout>
    )
}
export default IndexPage
