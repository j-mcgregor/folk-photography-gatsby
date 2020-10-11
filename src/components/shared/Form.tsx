import * as React from 'react'
import styled from 'styled-components'

import TextArea from '../form/TextArea'
import TextInput from '../form/TextInput'

const StyledForm = styled.form`
    button {
        margin-top: 0.5em;
        width: 100%;
    }
`

const Form = () => {
    const [email, setEmail] = React.useState<string>('')
    const [message, setMessage] = React.useState<string>('')

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log('submitted')
    }

    return (
        <StyledForm style={{ width: 400 }} className="container pb2" onSubmit={handleSubmit}>
            <div className="mb2">
                <TextInput
                    label="Email"
                    placeholder="Your email"
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.currentTarget.value)}
                    classNames={['my2']}
                />
                <TextArea
                    label="Message"
                    placeholder="Message"
                    value={message}
                    onChange={e => setMessage(e.currentTarget.value)}
                />
            </div>
            <button className="btn btn-lg text-uppercase pt3">Submit</button>
        </StyledForm>
    )
}

export default Form
