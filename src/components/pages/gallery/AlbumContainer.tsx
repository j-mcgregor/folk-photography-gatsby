import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import createKey from '../../../utils/createKey'
import { chunkArray } from '../../../utils/chunkArray'
import { GridStyle } from '../../../types/enums'
import Modal from '../../shared/modal/Modal'
import { useKeyPress } from '../../../utils/hooks/useKeyPress'
import { GalleryUtils } from '../../../utils/helpers/gallery'
import { AlbumImageProps } from '../../../templates/Album'

interface AlbumContainerProps {
    images: AlbumImageProps[]
}

const AlbumContainer: React.FC<AlbumContainerProps> = ({ images }) => {
    const [gridStyle, setGridStyle] = React.useState<GridStyle>(GridStyle.COL)

    React.useEffect(() => {
        const item = window.localStorage.getItem('GridStyle')

        switch (item) {
            case 'ROW':
                setGridStyle(GridStyle.ROW)
                break
            default:
                setGridStyle(GridStyle.COL)
                break
        }
    }, [])

    /**
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     * @keyEvent left / right
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     */

    //  will fire on each rerender >>>>>>>>>>
    const leftPress: boolean = useKeyPress('ArrowLeft')
    const rightPress: boolean = useKeyPress('ArrowRight')
    const escPress: boolean = useKeyPress('Escape')
    // <<<<<<<<<<<<

    const [cursor, setCursor] = React.useState<number>(0)
    const [selected, setSelected] = React.useState<AlbumImageProps>(images[cursor])
    const [modalOpen, setModalOpen] = React.useState<boolean>(false)

    React.useEffect(() => {
        if (images.length && leftPress) {
            setCursor(prevState => GalleryUtils.moveLeft(prevState, images))
        }
    }, [leftPress])

    React.useEffect(() => {
        if (images.length && rightPress) {
            setCursor(prevState => GalleryUtils.moveRight(prevState, images))
        }
    }, [rightPress])

    React.useEffect(() => {
        setModalOpen(false)
    }, [escPress])

    // set the current image when modal is open
    React.useEffect(() => setSelected(images[cursor]), [cursor])

    /**
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     * @modal
     * onClick img sets modal image URL
     * then its opens the modal
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     */

    const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
        return images.filter((i, x) => {
            if (i.gallery_image.url === e.currentTarget.src) {
                // set the current selected image
                setSelected(i)
                // set the INDEX of the current image (important when cycling through the modal images)
                setCursor(x)
                // open the modal
                setModalOpen(true)
                // for testing
                GalleryUtils.setImage(i, x, true)
            }
        })[0]
    }

    const handleCloseModal = () => setModalOpen(false)

    /**
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     * @version 2
     * @name : EQUAL HEIGHT ROW
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     */

    const row =
        images.length &&
        images
            .map(
                (img: AlbumImageProps, i: number) =>
                    img.gallery_image.url && (
                        <div className="image-container" key={createKey('key', i)}>
                            <img
                                src={img.gallery_image.url}
                                onClick={handleImageClick}
                                data-testid={`gallery-img-${i}`}
                            />
                        </div>
                    )
            )
            .filter(i => i)

    /**
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     * @version 3
     * @name : EQUAL WIDTH COLUMN
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     */

    const col = chunkArray<AlbumImageProps>(images, 3)
        .map((imgArr: AlbumImageProps[], index: number) => {
            const imgs = imgArr.map((img: AlbumImageProps, i: number) => {
                return (
                    <div className="image-container" key={createKey('key', i)}>
                        <img
                            src={img.gallery_image.url}
                            onClick={handleImageClick}
                            data-testid={`gallery-img-${i}`}
                        />
                    </div>
                )
            })
            return (
                <div key={createKey('key', index)} className="image-column">
                    {imgs}
                </div>
            )
        })
        .filter(i => i)

    return (
        <div className="album-container pb3" data-testid="gallery-container">
            {gridStyle === GridStyle.COL ? col : null}
            {gridStyle === GridStyle.ROW ? row : null}
            <Modal
                src={selected?.gallery_image.url}
                caption={selected?.image_captions}
                isOpen={modalOpen}
                handleClose={handleCloseModal}
            />
        </div>
    )
}

export default AlbumContainer
