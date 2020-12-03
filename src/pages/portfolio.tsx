import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

import Layout from '../components/Layout'
import GalleryContainer from '../components/pages/gallery/GalleryContainer'
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
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                            caption {
                                raw
                            }
                            alt_text {
                                raw
                            }
                        }
                        primary {
                            album {
                                raw
                            }
                        }
                    }
                }
            }
        }
    }
`

export interface PortfoliImageProps {
    alt_text: {
        raw: RichTextBlock[]
    }
    caption: {
        raw: RichTextBlock[]
    }
    image: {
        url: string
        fluid: FluidObject
    }
}

interface PortfolioPageBodyProps {
    id: string
    items: PortfoliImageProps[]
    primary: {
        album: {
            raw: RichTextBlock[]
        }
    }
}

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
                body: PortfolioPageBodyProps[]
            }
        }
    }
}

const PortfolioPage: React.FC<PortfolioPageProps> = ({ data: { prismicGallery } }) => {
    const {
        data: { title, description, body },
    } = prismicGallery

    const allImages = body.flatMap(b => b.items)

    return (
        <Layout>
            <SEO title="Portfolio" />
            <div className="portfolio flex flex-column">
                {title?.raw && <RichText render={title.raw} />}
                {description?.raw && (
                    <div className="description">
                        <RichText render={description.raw} />
                    </div>
                )}
            </div>
            {allImages?.length && <GalleryContainer images={allImages} />}
        </Layout>
    )
}

export default PortfolioPage
