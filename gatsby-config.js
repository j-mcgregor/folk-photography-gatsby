/* eslint-disable @typescript-eslint/camelcase */
var PrismicDOM = require('prismic-dom')
var Elements = PrismicDOM.RichText.Elements

module.exports = {
  siteMetadata: {
    title: `Connexos Design`,
    description: `Slow fashion thats just for you`,
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
        // The name of your prismic.io repository. This is required.
        // Example: 'gatsby-source-prismic-test-site' if your prismic.io address
        // is 'gatsby-source-prismic-test-site.prismic.io'.
        repositoryName: 'connexos-design',

        // An API access token to your prismic.io repository. This is optional.
        // You can generate an access token in the "API & Security" section of
        // your repository settings. Setting a "Callback URL" is not necessary.
        // The token will be listed under "Permanent access tokens".
        // accessToken:
        //   'MC5YMjYzM3hBQUFQc3Bud2lu.77-9Hy3vv73vv73vv71B77-977-977-9e1Bz77-977-977-9XC5U77-977-977-9Fu-_vWbvv71OO2ws77-9Uw',

        // Provide an object of Prismic custom type JSON schemas to load into
        // Gatsby. This is required.
        schemas: {
          // Your custom types mapped to schemas
          gallery: require('./src/schemas/gallery.json'),
          about: require('./src/schemas/about.json'),
          contact: require('./src/schemas/contact.json'),
        },
      },
    },

    `gatsby-plugin-typescript`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
