/**
 * @func setImage
 * @description used to test React Hooks
 * @param i - Generic (image type)
 * @param x - number => index of the image in the array
 * @param trigger - boolean => did it enable the modal
 */

export const setImage = <T>(i: T, x: number, trigger: boolean) => {
    return {
        item: i,
        index: x,
        trigger,
    }
}

/**
 * @func moveLeft
 * @description Should cycle left-wards indefinitely
 * @param prevState - the previous state (number)
 * @param arr - the array to check the length of
 */

export const moveLeft = <T>(prevState: number, arr: T[]) => {
    if (prevState === 0) {
        return arr.length - 1
    } else if (prevState > 0) {
        return prevState - 1
    } else {
        return prevState
    }
}

/**
 * @func moveLeft
 * @description Should cycle right-wards indefinitely
 * @param prevState - the previous state (number)
 * @param arr - the array to check the length of
 */

export const moveRight = <T>(prevState: number, arr: T[]) => {
    if (prevState === arr.length - 1) {
        return 0
    } else if (prevState < arr.length - 1) {
        return prevState + 1
    } else {
        return prevState
    }
}

export const GalleryUtils = {
    setImage,
    moveLeft,
    moveRight,
}
