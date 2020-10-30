import { graphql } from 'gatsby'
import { RichText, RichTextBlock } from 'prismic-reactjs'
import * as React from 'react'
import styled from 'styled-components'

import Layout from '../components/Layout'
import SEO from '../components/SEO'

interface PricingLevelsProps {
    included: {
        raw: RichTextBlock[]
    }
    price: string
    icon: {
        url: string
    }
    tier: {
        raw: RichTextBlock[]
    }
}
interface PricingPageProps {
    data: {
        prismicPricing: {
            data: {
                pricing: {
                    raw: RichTextBlock[]
                }
                pricing_levels: PricingLevelsProps[]
            }
        }
    }
}

export const query = graphql`
    {
        prismicPricing {
            data {
                pricing_levels {
                    price
                    icon {
                        url
                    }
                    tier {
                        raw
                    }
                    included {
                        raw
                    }
                }
                pricing {
                    raw
                }
            }
        }
    }
`

const S = {
    PricingContainer: styled.div`
        height: 60vh;

        ul {
            list-style: '✓';
            padding: 0;
            width: 100px;
            margin: auto;
        }
    `,
    CardContainer: styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 800px;
        margin: auto;
    `,
    Card: styled.div`
        width: 30%;
        padding: 1em;
        height: 500px;
        border: 1px solid grey;
    `,
}

const PricingPage: React.FC<PricingPageProps> = ({ data }) => {
    const {
        prismicPricing: { data: pricing },
    } = data
    console.log(pricing)
    return (
        <Layout>
            <SEO title="Pricing" />
            <S.PricingContainer className="container mt5">
                <div className="row">
                    <div className="col-md-12 text-center">
                        {pricing.pricing?.raw && <RichText render={pricing.pricing.raw} />}
                    </div>
                </div>
                <div className="row flex flex-center">
                    <div className="col-md-12">
                        <S.CardContainer className="row">
                            {pricing.pricing_levels.map(p => {
                                return (
                                    <S.Card className="text-center">
                                        <RichText render={p.tier.raw} />
                                        <img src={p.icon.url} width="100" alt="" />
                                        <h3>{p.price}</h3>
                                        <RichText render={p.included.raw} />
                                    </S.Card>
                                )
                            })}
                        </S.CardContainer>
                    </div>
                </div>
            </S.PricingContainer>
        </Layout>
    )
}

export default PricingPage
