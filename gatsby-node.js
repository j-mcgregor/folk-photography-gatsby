const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // Query all Albums with their IDs and template data.
    const pages = await graphql(`
        {
            allPrismicAlbum {
                nodes {
                    id
                    uid
                }
            }
        }
    `)

    // Create pages for each Album in Prismic using the selected template.
    pages.data.allPrismicAlbum.nodes.forEach(node => {
        createPage({
            path: `/portfolio/${node.uid}`,
            component: path.resolve(__dirname, 'src/templates/Album.tsx'),
            context: {
                id: node.id,
            },
        })
    })
}
