import * as React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

const NotFoundPage = () => (
    <Layout>
        <SEO title="404: Not found" />
        <h1>NOT FOUND</h1>
        <p>Sorry that page doesn't exist</p>
    </Layout>
)

export default NotFoundPage
