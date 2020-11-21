import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'
import Layout from '../components/Layout'
import AlbumContainer from '../components/pages/gallery/AlbumContainer'

export interface AlbumImageProps {
    gallery_image: {
        url: string
    }
    image: {
        url: string
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
        font-family: 'Raleway-Thin';
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

    return (
        <Layout>
            <S.AlbumPage className="container-fluid">
                <div className="row">
                    <S.AlbumHeader className="col-md-12 p3">
                        <div className="title-section">
                            {album.title && <RichText render={album.title.raw} />}
                            {album.description && <RichText render={album.description.raw} />}
                        </div>
                    </S.AlbumHeader>
                </div>
                {album.body[0]?.items && <AlbumContainer images={album.body[0].items} />}
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
                }
                body {
                    ... on PrismicAlbumBodyImageGallery {
                        slice_type
                        id
                        items {
                            gallery_image {
                                url
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
