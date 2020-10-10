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
            contact_method {
              name
              link {
                url
              }
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
          />
          <main>{props.children}</main>
          <Footer links={data.prismicContact.data.contact_method} />
        </div>
      )
    }}
  />
)

interface LayoutProps {
  children: unknown
}

export default Layout
