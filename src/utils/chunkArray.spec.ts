import { chunkArray } from './chunkArray'
import { times } from 'lodash'

describe('chunkArray', () => {
    // BASIC (unecessary) tests
    it('(["string"], 1) => [ [ "string" ] ]', () => {
        const result = chunkArray(['hello'], 1)
        expect(result).toEqual([['hello']])
    })
    it('(["string"],2) => [ [ "string" ] ]', () => {
        const result = chunkArray(['hello'], 2)
        expect(result).toEqual([['hello']])
    })
    it('([number], 1) => [ [ number ] ]', () => {
        const result = chunkArray([123], 1)
        expect(result).toEqual([[123]])
    })
    it('([number], 2) => [ [ number ] ]', () => {
        const result = chunkArray([123], 2)
        expect(result).toEqual([[123]])
    })

    // relevant tests
    describe('with image objects', () => {
        const images = [
            {
                url: 'test-1.url',
                alt: 'alt text 1',
            },
            {
                url: 'test-2.url',
                alt: 'alt text 2',
            },
            {
                url: 'test-3.url',
                alt: 'alt text 3',
            },
        ]

        it('should not split array if n === 1', () => {
            const result = chunkArray(images, 1)

            expect(result.length).toBe(1)
        })
        it('should split into 2 arrays with 2 items in first column if n === 2', () => {
            const result = chunkArray(images, 2)

            expect(result.length).toBe(2)
            if (Array.isArray(result[0])) {
                expect(result[0].length).toBe(2)
            }
        })

        it('should split into 3 arrays with 1 item in each column if n === 3', () => {
            const result = chunkArray(images, 3)

            expect(result.length).toBe(3)

            result.forEach(r => {
                if (Array.isArray(r)) {
                    expect(r.length).toBe(1)
                }
            })
        })
    })

    describe('Many items', () => {
        it('should evenly spread if cleanly divisible', () => {
            const list = times(100, num => ({
                url: `test-${num}.url`,
                alt: `alt text ${num}`,
            }))

            const result = chunkArray(list, 5)

            result.forEach(r => {
                if (Array.isArray(r)) {
                    expect(r.length).toBe(20)
                }
            })
        })

        it('should populate more in first column if not cleanly divisible', () => {
            const list = times(101, num => ({
                url: `test-${num}.url`,
                alt: `alt text ${num}`,
            }))

            const result = chunkArray(list, 4)

            if (Array.isArray(result[0])) {
                expect(result[0].length).toBe(26)
            }
        })
    })
})
