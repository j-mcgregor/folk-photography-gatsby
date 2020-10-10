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

import Footer from './shared/Footer'
import SideNav from './SideNav'

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
            }
        `}
        render={data => {
            return (
                <div className="main-container">
                    <SideNav
                        title={data.site.siteMetadata.title}
                        options={[
                            {
                                to: '/about',
                                content: 'About',
                            },
                            {
                                to: '/portfolio',
                                content: 'Portfolio',
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
            )
        }}
    />
)

interface LayoutProps {
    children: unknown
}

export default Layout
