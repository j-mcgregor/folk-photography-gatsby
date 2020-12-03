import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import Img, { FluidObject } from 'gatsby-image'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicAbout {
            data {
                title {
                    raw
                }
                main_image {
                    url
                    alt
                    dimensions {
                        width
                        height
                    }
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
`

interface AboutPageProps {
    data: {
        prismicAbout: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                main_image: {
                    alt: string
                    url: string
                    fluid: FluidObject
                }
                description: {
                    raw: RichTextBlock[]
                }
            }
        }
    }
}

const StyledAboutPage = styled.div`
    .description {
        .gatsby-image-wrapper {
            margin-top: 1em;
            width: 50%;
        }
    }
`

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
    const { title, description, main_image } = data.prismicAbout.data

    return (
        <Layout>
            <SEO title="About" />
            <StyledAboutPage className="about flex flex-column">
                <RichText render={title.raw} />
                <div className="description text-justify">
                    <RichText render={description.raw} />
                    <Img fluid={main_image.fluid} alt="Logo" />
                </div>
            </StyledAboutPage>
        </Layout>
    )
}

export default AboutPage
