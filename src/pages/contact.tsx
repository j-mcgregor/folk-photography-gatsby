import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import Form from '../components/shared/Form'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

export const query = graphql`
    {
        prismicContact {
            data {
                title {
                    raw
                }
                subtitle {
                    raw
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
                subtitle: {
                    raw: RichTextBlock[]
                }
            }
        }
    }
}

const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
    const { title, subtitle } = data.prismicContact.data

    return (
        <Layout>
            <SEO title="Contact" />
            <div className="contact flex flex-column">
                <div className="jumbotron p7 text-center">
                    {title?.raw && <RichText render={title.raw} />}
                    {subtitle?.raw && (
                        <div className="description">
                            <RichText render={subtitle.raw} />
                        </div>
                    )}
                </div>
                <Form />
            </div>
        </Layout>
    )
}

export default ContactPage
