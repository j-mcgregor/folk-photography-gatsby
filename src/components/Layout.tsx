/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */
import '../assets/stylesheets/main.scss'
import 'flexboxgrid2/flexboxgrid2.css'

import { graphql, StaticQuery } from 'gatsby'
import * as React from 'react'

import SideNav, { LinkProps } from './SideNav'
import { ThemeProvider } from 'styled-components'

export const theme = {
    palette: {
        black: 'rgb(17, 17, 17)',
        dark: 'rgb(26, 20, 35)',
        dark_1: 'rgb(55, 37, 73)',
        dark_2: 'rgb(55, 37, 73)',
        center: 'rgb(183, 93, 105)',
        light_2: 'rgb(234, 205, 194)',
        light_1: 'rgb(255, 188, 181)',
        light: 'rgb(245, 243, 240)',
        white: 'rgb(255, 255, 255)',
    },
    paletteOpacity: {
        black: (a: string) => `rgba(17, 17, 17, ${a})`,
        dark: (a: string) => `rgba(26, 20, 35, ${a})`,
        dark_1: (a: string) => `rgba(55, 37, 73, ${a})`,
        dark_2: (a: string) => `rgba(55, 37, 73, ${a})`,
        center: (a: string) => `rgba(183, 93, 105, ${a})`,
        light_2: (a: string) => `rgba(234, 205, 194, ${a})`,
        light_1: (a: string) => `rgba(255, 188, 181, ${a})`,
        light: (a: string) => `rgba(245, 243, 240, ${a})`,
        white: (a: string) => `rgba(255, 255, 255, ${a})`,
    },
}

const Layout = (props: LayoutProps) => (
    <StaticQuery
        query={graphql`
            query SiteTitleQuery {
                site {
                    siteMetadata {
                        title
                    }
                }
                prismicContact {
                    data {
                        title {
                            raw
                        }
                        subtitle {
                            raw
                        }
                        social_links {
                            url {
                                url
                            }
                            name
                        }
                    }
                }
                allPrismicAlbum {
                    nodes {
                        id
                        uid
                    }
                }
                file(
                    sourceInstanceName: { eq: "images" }
                    relativePath: { eq: "folk-photography-logo.png" }
                ) {
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
        `}
        render={data => {
            const subnav: LinkProps[] = data.allPrismicAlbum.nodes?.map((s: any) => {
                const nav: LinkProps = {
                    to: `/portfolio/${s.uid}`,
                    content: s.uid,
                }
                return nav
            })

            return (
                <ThemeProvider theme={theme}>
                    <div className="main-container">
                        <SideNav
                            logo={data.file?.childImageSharp.fixed.src}
                            title={data.site.siteMetadata.title}
                            options={[
                                {
                                    to: '/about',
                                    content: 'About',
                                },
                                {
                                    to: '/portfolio',
                                    content: 'Portfolio',
                                    subnav,
                                },
                                {
                                    to: '/pricing',
                                    content: 'Pricing',
                                },
                                {
                                    to: '/contact',
                                    content: 'Get in touch',
                                },
                            ]}
                            links={data.prismicContact.data.social_links}
                        />
                        <main>{props.children}</main>
                    </div>
                </ThemeProvider>
            )
        }}
    />
)

interface LayoutProps {
    children: unknown
}

export default Layout
