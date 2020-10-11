import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicGallery {
            data {
                title {
                    raw
                }
                description {
                    raw
                }
                body {
                    ... on PrismicGalleryBodyImageGallery {
                        id
                        items {
                            image {
                                url
                            }
                        }
                    }
                }
            }
        }
    }
`

interface PortfolioPageProps {
    data: {
        prismicGallery: {
            data: {
                title: {
                    raw: RichTextBlock[]
                }
                description: {
                    raw: RichTextBlock[]
                }
            }
        }
    }
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ data: { prismicGallery } }) => {
    const {
        data: { title, description },
    } = prismicGallery

    return (
        <Layout>
            <SEO title="Portfolio" />
            <div className="about flex flex-column">
                {title?.raw && <RichText render={title.raw} />}
                {description?.raw && (
                    <div className="description">
                        <RichText render={description.raw} />
                    </div>
                )}
            </div>
        </Layout>
    )
}

export default PortfolioPage
