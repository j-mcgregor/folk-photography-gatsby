import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import GalleryContainer from '../components/pages/gallery/GalleryContainer'
import { PortfoliImageProps } from '../pages/portfolio'

export interface AlbumImageProps {
    gallery_image: {
        url: string
        fluid: FluidObject
    }
    image: {
        url: string
        fluid: FluidObject
    }
    image_captions: {
        raw: RichTextBlock[]
    }
}

export interface AlbumPageNodeBodyProps {
    slice_type: string
    id: string
    items: AlbumImageProps[]
}

export interface AlbumsPageNodeProps {
    id: string
    uid: string
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
        body: AlbumPageNodeBodyProps[]
    }
}

export interface AlbumsPageProps {
    data: {
        allPrismicAlbum: {
            nodes: AlbumsPageNodeProps[]
        }
    }
}

interface AlbumPageType {
    data: { prismicAlbum: AlbumsPageNodeProps }
}

const S = {
    AlbumPage: styled.div`
        /* height: 60vh; */
    `,

    AlbumHeader: styled.div`
        height: 60vh;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        font-family: 'LibreBaskerville-Regular';
        padding: 0.7em 4em;

        img {
            width: 100%;
            box-shadow: 0px 4px 14px -3px black;
        }

        .title-section {
            width: 85%;
            h1 {
                padding: 0.2em 2em;
                font-size: 3em;
                text-transform: uppercase;
            }
        }

        @media only screen and (max-width: ${({ theme }) => theme.width.md}) {
            height: auto;
            .title-section {
                width: 100%;
                h1 {
                    padding: 0.2em 2em;
                    font-size: 2em;
                    text-transform: uppercase;
                }

                p {
                    font-size: 0.8em;
                }
            }
        }
    `,
}

const Album: React.FC<AlbumPageType> = ({ data }) => {
    const { data: album } = data.prismicAlbum

    const allImages = album.body[0].items.map(b => {
        return {
            image: b.gallery_image,
            alt_text: {
                raw: [],
            },
            caption: b.image_captions,
        } as PortfoliImageProps
    })

    return (
        <Layout>
            <S.AlbumPage className="container-fluid">
                <div className="row">
                    <S.AlbumHeader className="col-md-12 p3">
                        <div className="title-section">
                            <RichText render={album.title.raw} />
                            <RichText render={album.description.raw} />
                        </div>
                    </S.AlbumHeader>
                </div>
                {album.body[0]?.items && <GalleryContainer images={allImages} />}
            </S.AlbumPage>
        </Layout>
    )
}

export const query = graphql`
    query Album($id: String) {
        prismicAlbum(id: { eq: $id }) {
            id
            data {
                title {
                    raw
                }
                description {
                    raw
                }
                main_image {
                    url
                    alt
                    fluid {
                        src
                        srcSet
                        aspectRatio
                        sizes
                    }
                }
                body {
                    ... on PrismicAlbumBodyImageGallery {
                        slice_type
                        id
                        items {
                            gallery_image {
                                url
                                fluid {
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                }
                            }
                            image_captions {
                                raw
                            }
                        }
                    }
                }
            }
        }
    }
`

export default Album
