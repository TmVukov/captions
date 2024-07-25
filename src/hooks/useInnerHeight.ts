import { RefObject, useEffect, useState } from 'react'

export const useInnerHeight = (
    captionsTitleRef: RefObject<HTMLElement>,
    outerHeight: number
) => {
    const [innerHeight, setInnerHeight] = useState<number>(0)

    useEffect(() => {
        if (captionsTitleRef.current) {
            const captionTitleHeight = captionsTitleRef.current.offsetHeight
            setInnerHeight(outerHeight - captionTitleHeight)
        }
    }, [captionsTitleRef, outerHeight, setInnerHeight])

    return { innerHeight }
}
