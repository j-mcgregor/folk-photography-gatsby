/* eslint-disable @typescript-eslint/camelcase */
var PrismicDOM = require('prismic-dom')
var Elements = PrismicDOM.RichText.Elements

module.exports = {
    siteMetadata: {
        title: `Folk Photography`,
        description: `Real people. Real photos.`,
        author: `@jmcgregor`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `fonts`,
                path: `${__dirname}/src/assets/fonts`,
            },
        },
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `gatsby-starter-default`,
                short_name: `starter`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-source-prismic',
            options: {
                repositoryName: 'folk-photography',
                schemas: {
                    landing: require('./src/schemas/landing.json'),
                    blog_post: require('./src/schemas/blog_post.json'),
                    contact: require('./src/schemas/contact.json'),
                    gallery: require('./src/schemas/gallery.json'),
                    about: require('./src/schemas/about.json'),
                },
            },
        },

        `gatsby-plugin-typescript`,
        // this (optional) plugin enables Progressive Web App + Offline functionality
        // To learn more, visit: https://gatsby.dev/offline
        // `gatsby-plugin-offline`,
    ],
}
