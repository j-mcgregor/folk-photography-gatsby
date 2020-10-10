import * as React from 'react'
import TextArea from './form/TextArea'
import TextInput from './form/TextInput'

const Form = () => {
  const [email, setEmail] = React.useState<string>('')
  const [message, setMessage] = React.useState<string>('')

  return (
    <form style={{ width: 400 }} className="container py2">
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
    </form>
  )
}

export default Form
