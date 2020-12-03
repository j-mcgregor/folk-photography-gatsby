import styled from 'styled-components'

export const Button = styled.a`
    margin: 5em auto;
    padding: 1em 3em;
    border: 1px solid ${({ theme }) => theme.palette.center};
    color: ${({ theme }) => theme.palette.center};
`
