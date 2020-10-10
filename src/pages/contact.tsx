import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import Form from '../components/form'

import Layout from '../components/layout'
import SEO from '../components/seo'

export const query = graphql`
  {
    prismicContact {
      data {
        title {
          raw
        }
        description {
          raw
        }
        background_image {
          url
          alt
        }
      }
    }
  }
`

interface ContactPageProps {
  data: {
    prismicContact: {
      data: {
        title: {
          raw: RichTextBlock[]
        }
        description: {
          raw: RichTextBlock[]
        }
        background_image: {
          alt: string
          url: string
        }
      }
    }
  }
}

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  const { title, description, background_image } = data.prismicContact.data

  return (
    <Layout>
      <SEO title="Contact" />
      <div className="contact flex flex-column">
        <div
          className="jumbotron p7 text-center"
          style={{ backgroundImage: `url(${background_image?.url})` }}
        >
          {title?.raw && <RichText render={title.raw} />}
          {description?.raw && (
            <div className="description">
              <RichText render={description.raw} />
            </div>
          )}
        </div>
        <Form />
      </div>
    </Layout>
  )
}

export default ContactPage
