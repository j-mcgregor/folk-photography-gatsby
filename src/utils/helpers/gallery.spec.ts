import { GalleryUtils } from './gallery'
import { times } from 'lodash'

describe('GalleryUtils', () => {
    // more used for testing
    describe('setImage', () => {
        it('should return an object with the given arguments as properties', () => {
            const result = GalleryUtils.setImage('string', 100, true)

            expect(result).toEqual({
                item: 'string',
                index: 100,
                trigger: true,
            })
        })

        it('should be able to have any type as the first argurment', () => {
            const argTypes: any[] = [{}, [], undefined, null, 1, true]

            argTypes.forEach(e => {
                const result = GalleryUtils.setImage(e, 100, true)

                expect(result).toEqual({
                    item: e,
                    index: 100,
                    trigger: true,
                })
            })
        })
    })

    let arr: Array<{ name: string }>
    beforeEach(() => {
        arr = times(10, num => ({
            name: `num-${num}`,
        }))
    })

    describe('moveLeft', () => {
        it('should set to the array length if previous state is 0', () => {
            const prevState = 0

            const result = GalleryUtils.moveLeft(prevState, arr)
            expect(result).toBe(9)
        })

        it('should decrease the index by 1', () => {
            const prevState = 5

            const result = GalleryUtils.moveLeft(prevState, arr)
            expect(result).toBe(4)
        })

        it('should otherwise return previous state', () => {
            const prevState = -5

            const result = GalleryUtils.moveLeft(prevState, arr)
            expect(result).toBe(prevState)
        })
    })

    describe('moveRight', () => {
        it('should set to 0 if the previous state is equal to the array length ', () => {
            const prevState = 9

            const result = GalleryUtils.moveRight(prevState, arr)
            expect(result).toBe(0)
        })

        it('should increase the index by 1', () => {
            const prevState = 5

            const result = GalleryUtils.moveRight(prevState, arr)
            expect(result).toBe(6)
        })

        it('should otherwise return previous state', () => {
            const prevState = arr.length + 1

            const result = GalleryUtils.moveRight(prevState, arr)
            expect(result).toBe(prevState)
        })
    })
})
