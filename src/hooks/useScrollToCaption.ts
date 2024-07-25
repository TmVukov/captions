import { useEffect } from 'react'
import { Caption } from '../types'

export const useScrollToCaption = (currentCaption: Caption | undefined) => {
    useEffect(() => {
        if (currentCaption) {
            const captionElement = document.getElementById(
                `caption-${currentCaption.id}`
            )

            captionElement?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            })
        }
    }, [currentCaption])
}
