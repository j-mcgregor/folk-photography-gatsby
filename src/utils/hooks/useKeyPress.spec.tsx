// import React from 'react'
import { renderHook, act } from '@testing-library/react-hooks'
import { useKeyPress } from './useKeyPress'

interface MapProps {
    keydown?(e: { [key: string]: any }): void
    keyup?(e: { [key: string]: any }): void
}

describe('useKeyPress', () => {
    // Don't bother implementing a keyboard event : it changes on every browser and usually doesn't even work.

    const map: MapProps = {}
    const listener = window.addEventListener

    beforeAll(() => {
        window.addEventListener = jest.fn((event, cb) => {
            map[event] = cb
        })
    })

    afterAll(() => (window.addEventListener = listener))

    it('should return true when targetKey === keydown event.key and then false after keyup', () => {
        const { result } = renderHook(() => useKeyPress('Enter'))

        // Initial
        expect(result.current).toBe(false)

        // First result (keydown)
        act(() => {
            if (map.keydown) {
                map.keydown({ key: 'Enter' })
            }
        })

        expect(result.current).toBe(true)

        // Second result (keyup)
        act(() => {
            if (map.keyup) {
                map.keyup({ key: 'Enter' })
            }
        })

        expect(result.current).toBe(false)
    })

    it('should return false if the targetKey !== keydown event.key', () => {
        const { result } = renderHook(() => useKeyPress('Enter'))

        // Initial
        expect(result.current).toBe(false)

        // First result (keydown)
        act(() => {
            if (map.keydown) {
                map.keydown({ key: 'ArrowRight' })
            }
        })

        expect(result.current).toBe(false)
    })

    it('should return false if the targetKey !== keyup event.key', () => {
        const { result } = renderHook(() => useKeyPress('Enter'))

        // Initial
        expect(result.current).toBe(false)

        // First result (keydown)
        act(() => {
            if (map.keyup) {
                map.keyup({ key: 'ArrowRight' })
            }
        })

        expect(result.current).toBe(false)
    })
})
