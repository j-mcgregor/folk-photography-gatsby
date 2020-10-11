import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from './linkResolver'
import { htmlSerializer } from './htmlSerializer'

const RichTextCustom = ({ render }) => (
    <RichText
        render={render}
        linkResolver={linkResolver}
        htmlSerializer={htmlSerializer}
    />
)

export default RichTextCustom
