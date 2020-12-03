import * as React from 'react'
import Img from 'gatsby-image'

import { PortfoliImageProps } from '../../../pages/portfolio'
import { GridStyle } from '../../../types/enums'
import { chunkArray } from '../../../utils/chunkArray'
import createKey from '../../../utils/createKey'
import { GalleryUtils } from '../../../utils/helpers/gallery'
import { useKeyPress } from '../../../utils/hooks/useKeyPress'
import Modal from '../../shared/modal/Modal'

interface GalleryContainerProps {
    images: PortfoliImageProps[]
}

const GalleryContainer: React.FC<GalleryContainerProps> = ({ images }) => {
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
    const [selected, setSelected] = React.useState<PortfoliImageProps>(images[cursor])
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
        console.log(e.currentTarget.dataset['img'])
        return images.filter((i, x) => {
            console.log('url', i.image.url)
            if (i.image.url === e.currentTarget.dataset['img']) {
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

    const col = chunkArray<PortfoliImageProps>(images, 3)
        .map((imgArr: PortfoliImageProps[], index: number) => {
            const imgs = imgArr.map((img: PortfoliImageProps, i: number) => {
                return (
                    <div
                        className="image-container"
                        key={createKey('key', i)}
                        onClick={handleImageClick}
                        data-img={img.image?.url}
                    >
                        <Img fluid={img.image?.fluid} data-testid={`gallery-img-${i}`} />
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
        <div className="gallery-container pb3" data-testid="gallery-container">
            {col}
            <Modal src={selected?.image?.fluid} isOpen={modalOpen} handleClose={handleCloseModal} />
        </div>
    )
}

export default GalleryContainer
