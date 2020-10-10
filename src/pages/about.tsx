import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'

import Layout from '../components/layout'
import SEO from '../components/seo'

export const query = graphql`
  {
    prismicAbout {
      data {
        title {
          raw
        }
        main_image {
          url
          alt
          dimensions {
            width
            height
          }
        }
        description {
          raw
        }
      }
    }
  }
`

interface AboutPageProps {
  data: {
    prismicAbout: {
      data: {
        title: {
          raw: RichTextBlock[]
        }
        main_image: {
          alt: string
          url: string
        }
        description: {
          raw: RichTextBlock[]
        }
      }
    }
  }
}

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  const { title, description } = data.prismicAbout.data
  return (
    <Layout>
      <SEO title="About" />
      <div className="about flex flex-column">
        {title?.raw && <RichText render={title.raw} />}
        {description?.raw && (
          <div className="description text-justify">
            <RichText render={description.raw} />
          </div>
        )}
      </div>
    </Layout>
  )
}

export default AboutPage
