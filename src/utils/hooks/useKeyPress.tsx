// https://stackoverflow.com/questions/42036865/react-how-to-navigate-through-list-by-arrow-keys
// https://usehooks.com/useKeyPress/
import { useState, useEffect } from 'react'

export const useKeyPress = (targetKey: string): boolean => {
    const [keyPressed, setKeyPressed] = useState<boolean>(false)

    const downHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(true)
        }
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) {
            setKeyPressed(false)
        }
    }

    useEffect(() => {
        window.addEventListener('keydown', downHandler)
        window.addEventListener('keyup', upHandler)

        return () => {
            window.removeEventListener('keydown', downHandler)
            window.removeEventListener('keyup', upHandler)
        }
    }, [])

    return keyPressed
}
