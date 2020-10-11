import * as React from 'react'
import { render, act } from '@testing-library/react'
import Modal, { ModalProps, ContentProps, Content } from './Modal'

describe('Modal', () => {
    let props: ModalProps
    beforeEach(() => {
        props = {
            isOpen: true,
            src: 'http://fillmurrary.com/500/500',
            handleClose: jest.fn(),
        }
    })

    it('should show display: "block" when isOpen is true', () => {
        const { baseElement } = render(<Modal {...props} />)

        expect(baseElement).toMatchSnapshot()
    })
    it('should show display: "none" when isOpen is false', () => {
        const { baseElement } = render(<Modal {...props} isOpen={false} />)

        expect(baseElement).toMatchSnapshot()
    })

    it('should close the modal when the X is clicked', () => {
        const { getByTestId } = render(<Modal {...props} />)

        const res = getByTestId('close')

        act(() => {
            res.click()
        })
        expect(props.handleClose).toHaveBeenCalled()
    })
})

describe('Content', () => {
    let props: ContentProps

    beforeEach(() => {
        props = {
            onClick: jest.fn(),
        }
    })

    // want to test that onClick is firing when clicking outside
    it('should not trigger onClick when child is clicked', () => {
        const { getByTestId } = render(
            <Content {...props}>
                <div data-testid="inside">Test</div>
            </Content>
        )

        const res = getByTestId('inside')

        act(() => {
            res.click()
        })

        expect(props.onClick).not.toHaveBeenCalled()
    })

    it('should trigger onClick when outside child is clicked', () => {
        const { getByTestId } = render(
            <div data-testid="outside">
                <Content {...props}>
                    <div>Test</div>
                </Content>
            </div>
        )

        const res = getByTestId('outside')

        act(() => {
            res.click()
        })

        expect(props.onClick).toHaveBeenCalled()
    })

    it('should do nothing if no children are passed', () => {
        const { getByTestId } = render(
            <div data-testid="outside">
                <Content {...props}></Content>
            </div>
        )

        const res = getByTestId('outside')

        act(() => {
            res.click()
        })

        expect(props.onClick).not.toHaveBeenCalled()
    })

    it('should do nothing if no children are passed 2', () => {
        jest.spyOn(React.Children, 'map').mockReturnValue([])

        const { queryByTestId } = render(
            <div data-testid="outside">
                <Content {...props}>
                    <div data-testid="inside-XXX"></div>
                </Content>
            </div>
        )

        const res = queryByTestId('inside-XXX')

        act(() => {
            res && res.click()
        })

        expect(props.onClick).not.toHaveBeenCalled()
    })
})
