/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from 'react'
import Helmet from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

function SEO(props: SEOProps) {
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                    }
                }
            }
        `
    )

    const metaTitle = props.title || site.siteMetadata.title
    const metaDescription = props.description || site.siteMetadata.description

    return (
        <Helmet
            title={props.title}
            titleTemplate={`%s | ${site.siteMetadata.title}`}
            meta={[
                {
                    name: `description`,
                    content: metaDescription,
                },
                // OPEN GRAPH
                {
                    property: `og:title`,
                    content: metaTitle,
                },
                {
                    property: `og:description`,
                    content: metaDescription,
                },
                {
                    property: `og:image`,
                    content: props.imageUrl,
                },
                {
                    property: `og:type`,
                    content: `website`,
                },
                // TWITTER
                {
                    name: `twitter:card`,
                    content: `summary`,
                },
                {
                    name: `twitter:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `twitter:title`,
                    content: metaTitle,
                },
                {
                    name: `twitter:description`,
                    content: metaDescription,
                },
                // INSTAGRAM
                {
                    name: `instagram:card`,
                    content: `summary`,
                },
                {
                    name: `instagram:creator`,
                    content: site.siteMetadata.author,
                },
                {
                    name: `instagram:title`,
                    content: metaTitle,
                },
                {
                    name: `instagram:description`,
                    content: metaDescription,
                },
            ].concat(props.meta)}
        >
            <html lang={props.lang} />
        </Helmet>
    )
}

SEO.defaultProps = {
    description: ``,
    imageUrl: ``,
    lang: `en`,
    meta: [],
}

interface SEOProps {
    description?: string
    imageUrl?: string
    lang?: string
    meta?: MetaWithProperty[] | MetaWithName[]
    title: string
}

interface MetaWithProperty {
    property: string
    content: string
}

interface MetaWithName {
    name: string
    content: string
}

export default SEO
