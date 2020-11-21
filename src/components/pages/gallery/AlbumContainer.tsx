import * as React from 'react'

import { AlbumImageProps } from '../../../templates/Album'
import { chunkArray } from '../../../utils/chunkArray'
import createKey from '../../../utils/createKey'
import { GalleryUtils } from '../../../utils/helpers/gallery'
import { useKeyPress } from '../../../utils/hooks/useKeyPress'
import Modal from '../../shared/modal/Modal'

interface AlbumContainerProps {
    images: AlbumImageProps[]
}

const AlbumContainer: React.FC<AlbumContainerProps> = ({ images }) => {
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
     * @version 3
     * @name : EQUAL WIDTH COLUMN
     * >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
     */

    const col = chunkArray<AlbumImageProps>(images, 3)
        .map((imgArr: AlbumImageProps[], index: number) => {
            const imgs = imgArr.map((img: AlbumImageProps, i: number) =>
                img.gallery_image?.url ? (
                    <div className="image-container" key={createKey('key', i)}>
                        <img
                            src={img.gallery_image.url}
                            onClick={handleImageClick}
                            data-testid={`gallery-img-${i}`}
                        />
                    </div>
                ) : null
            )

            return (
                <div key={createKey('key', index)} className="image-column">
                    {imgs}
                </div>
            )
        })
        .filter(i => i)

    console.log(selected)

    return (
        <div className="gallery-container pb3" data-testid="gallery-container">
            {col}
            <Modal
                src={selected?.gallery_image?.url}
                caption={selected?.image_captions}
                isOpen={modalOpen}
                handleClose={handleCloseModal}
            />
        </div>
    )
}

export default AlbumContainer
