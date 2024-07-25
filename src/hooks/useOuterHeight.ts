import { RefObject, useEffect, useState } from 'react'

export const useOuterHeight = (
    videoRef: RefObject<HTMLElement>,
    controlsRef: RefObject<HTMLElement>,
    isLoading: boolean
) => {
    const [outerHeight, setOuterHeight] = useState<number>(0)

    useEffect(() => {
        const calculateHeight = () => {
            const videoHeight = videoRef.current?.offsetHeight
            const controlsHeight = controlsRef.current?.offsetHeight

            if (videoHeight && controlsHeight) {
                setOuterHeight(videoHeight + controlsHeight)
            }
        }

        if (!isLoading && videoRef.current) {
            calculateHeight()
            window.addEventListener('resize', calculateHeight)
        }
    }, [isLoading, videoRef, controlsRef])

    return { outerHeight }
}
