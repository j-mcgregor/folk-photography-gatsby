import * as React from 'react'

export interface ModalProps {
    src: string
    isOpen: boolean
    handleClose(): void
}

export interface ContentProps {
    children?: React.ReactNode
    onClick(): void
}

export const Content: React.FC<ContentProps> = ({ children, onClick }) => {
    // Refs are used when we want to interact / modify a React element that may be outside of our render
    // Here, we're mapping all of the children passed into this component so we can easily find it on the DOM
    const refs = React.Children.map(children, () => React.createRef<HTMLDivElement>())

    // Whenever the document receives a click element, we want to trigger this method
    const handleClick = (e: MouseEvent) => {
        // no children, no refs
        if (refs) {
            // for each ref (child)
            const isOutside = refs.every(ref => {
                // https://stackoverflow.com/questions/43842057/detect-if-click-was-inside-react-component-or-not-in-typescript
                return ref && ref.current && !ref.current.contains(e.target as Node)
            })

            if (isOutside) {
                onClick()
            }
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    })

    const mapped = React.Children.map(children, (child, x) => {
        // https://stackoverflow.com/questions/42261783/how-to-assign-the-correct-typing-to-react-cloneelement-when-giving-properties-to
        return (
            refs &&
            React.isValidElement(child) &&
            React.cloneElement(child, {
                ref: refs[x],
            })
        )
    })

    return <React.Fragment>{mapped}</React.Fragment>
}

const Modal: React.FC<ModalProps> = ({ isOpen, src, handleClose }) => {
    return (
        <div className="modal" style={{ display: isOpen ? 'block' : 'none' }}>
            <span className="close" onClick={handleClose} data-testid="close">
                &times;
            </span>
            <Content onClick={handleClose}>
                <img className="modal-content" src={src} />
            </Content>
            <div className="caption"></div>
        </div>
    )
}

export default Modal
