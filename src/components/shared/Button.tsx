import styled from 'styled-components'

export const Button = styled.a`
    margin: 5em auto;
    padding: 1em 3em;
    border: 1px solid ${({ theme }) => theme.palette.center};
    color: ${({ theme }) => theme.palette.center};
    transition: 0.1s;
    text-transform: uppercase;

    &:hover {
        text-decoration: none;
        color: ${({ theme }) => theme.palette.light};
        background: ${({ theme }) => theme.palette.center};
    }
`
