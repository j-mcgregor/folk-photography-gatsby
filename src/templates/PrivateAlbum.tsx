import { faDownload } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { graphql } from 'gatsby'
import { FluidObject } from 'gatsby-image'
import * as moment from 'moment'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import GalleryContainer from '../components/pages/gallery/GalleryContainer'
import { AnimateOut } from '../pages/pricing'
import { AlbumImageProps } from './Album'

export interface AlbumPageNodeBodyProps {
    id: string
    slice_type: string
    items: AlbumImageProps[]
}

export interface AlbumsPageNodeProps {
    id: string
    uid: string
    data: {
        title: {
            raw: RichTextBlock[]
        }
        password: string
        download_link: {
            url: string
            fluid: FluidObject
        }
        description: {
            raw: RichTextBlock[]
        }
        date: string
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

interface PrivateAlbumPageType {
    data: { prismicPrivateAlbum: AlbumsPageNodeProps }
}

const S = {
    AlbumHeader: styled.div`
        height: 40vh;
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

export const Input = styled(AnimateOut)<{ isMatch?: boolean }>`
    padding: 1em 2em;
    font-size: 1.2em;
    width: 50%;
    margin: auto;
    text-align: center;
    border: 1px solid ${({ isMatch }) => (isMatch === true ? 'green' : 'grey')};
    border-radius: 5px;

    &:focus {
        outline: none;
    }
`

const PrivateAlbum: React.FC<PrivateAlbumPageType> = ({ data }) => {
    const { data: album, uid } = data.prismicPrivateAlbum
    const [password, setPassword] = React.useState('')

    const isPasswordMatch = password === album.password

    React.useEffect(() => {
        if (typeof window !== 'undefined' && isPasswordMatch === true) {
            window.localStorage.setItem(uid, `${isPasswordMatch}`)
        }
    }, [isPasswordMatch])

    const allImages = album.body[0].items.map(b => {
        return {
            image: b.gallery_image,
            alt_text: {
                raw: [],
            },
            caption: b.image_captions,
        }
    })

    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <S.AlbumHeader className="col-md-12">
                        <div className="title-section">
                            {album.title && <RichText render={album.title.raw} />}
                            <h4>{moment(album.date).format('LL')}</h4>
                            {isPasswordMatch && (
                                <a
                                    href={album.download_link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-lg text-uppercase pt3"
                                    type="button"
                                >
                                    <FontAwesomeIcon icon={faDownload} className="mr1" />
                                    Download Link
                                </a>
                            )}
                        </div>
                    </S.AlbumHeader>
                    <Input
                        name="password"
                        type="password"
                        placeholder="Please enter the album password"
                        autoComplete="off"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        isMatch={isPasswordMatch}
                    />
                </div>
                {isPasswordMatch && album.body[0]?.items && <GalleryContainer images={allImages} />}
            </div>
        </Layout>
    )
}

export const query = graphql`
    query PrivateAlbum($id: String) {
        prismicPrivateAlbum(id: { eq: $id }) {
            id
            uid
            data {
                title {
                    raw
                }
                password
                download_link {
                    url
                }
                description {
                    raw
                }
                date
                body {
                    ... on PrismicPrivateAlbumBodyImageGallery {
                        id
                        slice_type
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

export default PrivateAlbum
