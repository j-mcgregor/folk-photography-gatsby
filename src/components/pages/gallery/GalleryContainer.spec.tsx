import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import * as Gatsby from 'gatsby'
import * as GalleryData from '../../__mocks__/data/gallery'
import GalleryContainer from './GalleryContainer'
import { PRISMIC_gallery_image_fields } from '../../types/interfaces/prismic'
import { GalleryUtils } from '../../utils/helpers/gallery'

const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery')

describe('<GalleryContainer />', () => {
    let localFiles
    let imageList: PRISMIC_gallery_image_fields[]

    beforeEach(() => {
        jest.spyOn(window.localStorage.__proto__, 'getItem')

        localFiles = GalleryData.localFiles
        imageList = GalleryData.imageList

        useStaticQuery.mockImplementation(() => localFiles)
    })

    it('should render the SVG icons', () => {
        const { getAllByTestId } = render(
            <GalleryContainer images={imageList} />
        )

        const SVGs = getAllByTestId('data-test-svg')

        expect(SVGs.length).toBe(3)
        SVGs.forEach((item, i) => {
            expect(item.getAttribute('src')).toBe(
                localFiles.allFile.edges[i].node.publicURL
            )
        })
    })

    it('should use localStorage to set to GRID if localStorage return null', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => null)

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'true'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe(
            'false'
        )
    })

    it('should use localStorage to set to: GRID', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'GRID')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'true'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe(
            'false'
        )
    })

    it('should use localStorage to set to: COL', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'COL')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe('true')
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe(
            'false'
        )
    })

    it('should use localStorage to set to: ROW', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'ROW')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe('true')
    })

    it('should handle onClick correctly: GRID -> COL', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'GRID')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'true'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )

        // ACT
        fireEvent.click(getByTitle('data-COL'))

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe('true')
    })

    it('should handle onClick correctly: GRID -> ROW', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'GRID')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'true'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe(
            'false'
        )

        // ACT
        fireEvent.click(getByTitle('data-ROW'))

        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe('true')
    })

    it('should handle onClick correctly: COL -> ROW', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'COL')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe('true')
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe(
            'false'
        )

        // ACT
        fireEvent.click(getByTitle('data-ROW'))

        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-ROW').getAttribute('data-checked')).toBe('true')
    })

    it('should handle onClick correctly: COL -> GRID', () => {
        // ASSEMBLE
        window.localStorage.__proto__.getItem = jest.fn(() => 'COL')

        const { getByTitle } = render(<GalleryContainer images={imageList} />)

        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe('true')
        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'false'
        )

        // ACT
        fireEvent.click(getByTitle('data-GRID'))

        expect(getByTitle('data-COL').getAttribute('data-checked')).toBe(
            'false'
        )
        expect(getByTitle('data-GRID').getAttribute('data-checked')).toBe(
            'true'
        )
    })

    describe('Modal', () => {
        afterEach(() => {
            jest.resetAllMocks()
        })
        it('should render a modal on image click', () => {
            const setImagesSpy = jest.spyOn(GalleryUtils, 'setImage')
            const { queryAllByTestId } = render(
                <GalleryContainer images={imageList} />
            )

            const img = queryAllByTestId('gallery-img-1')[0]

            fireEvent.click(img)

            expect(setImagesSpy.mock.calls[0][0]).toEqual({
                alt_text: [
                    {
                        spans: [],
                        text: 'text',
                        type: 'type',
                    },
                ],
                image: {
                    dimensions: {
                        height: 300,
                        width: 300,
                    },
                    alt: 'test-1',
                    copyright: 'test-1',
                    url: 'http://localhost/test-1',
                    thumbnail: {
                        dimensions: {
                            height: 300,
                            width: 300,
                        },
                        alt: 'test-1',
                        copyright: 'test-1',
                        url: 'http://localhost/test-1',
                    },
                },
                caption: [
                    {
                        spans: [],
                        text: 'text',
                        type: 'type',
                    },
                ],
            })
            expect(setImagesSpy.mock.calls[0][1]).toBe(1)
            expect(setImagesSpy.mock.calls[0][2]).toBe(true)
        })

        it('should move to the next image if right arrow is pressed', () => {
            // ASSEMBLE
            const setImagesSpy = jest.spyOn(GalleryUtils, 'moveRight')
            const { queryAllByTestId } = render(
                <GalleryContainer images={imageList} />
            )
            const currentImg = 1

            const img = queryAllByTestId(`gallery-img-${currentImg}`)[0]

            fireEvent.click(img)

            // ACT & ASSERT 1
            fireEvent.keyDown(window, { key: 'ArrowRight' })
            fireEvent.keyUp(window, { key: 'ArrowRight' })

            expect(setImagesSpy.mock.results[0].value).toBe(2)

            // ACT & ASSERT 2
            fireEvent.keyDown(window, { key: 'ArrowRight' })
            fireEvent.keyUp(window, { key: 'ArrowRight' })

            expect(setImagesSpy.mock.results[1].value).toBe(3)
        })

        it('should move to the previous image if left arrow is pressed', () => {
            // ASSEMBLE
            const setImagesSpy = jest.spyOn(GalleryUtils, 'moveLeft')
            const { queryAllByTestId } = render(
                <GalleryContainer images={imageList} />
            )
            const currentImg = 1

            const img = queryAllByTestId(`gallery-img-${currentImg}`)[0]

            fireEvent.click(img)

            // ACT & ASSERT 1
            fireEvent.keyDown(window, { key: 'ArrowLeft' })
            fireEvent.keyUp(window, { key: 'ArrowLeft' })

            expect(setImagesSpy.mock.results[0].value).toBe(0)

            // ACT & ASSERT 2
            fireEvent.keyDown(window, { key: 'ArrowLeft' })
            fireEvent.keyUp(window, { key: 'ArrowLeft' })

            expect(setImagesSpy.mock.results[1].value).toBe(19)
        })
    })
})
