import React from 'react'
import { render } from '@testing-library/react'
import Banner from './Banner'

describe('Banner', () => {
    it('should render', () => {
        const { baseElement } = render(<Banner />)
        expect(baseElement).toMatchSnapshot()
    })
})
