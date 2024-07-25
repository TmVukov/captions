import parseSRT from 'parse-srt'
import { useEffect, useState } from 'react'
import { Caption, CaptionLinks } from '../types'

export const useLoadCaptions = (
    selectedVideo: number | null,
    captionLinks: CaptionLinks
) => {
    const [captions, setCaptions] = useState<Caption[]>([])

    useEffect(() => {
        const loadCaptions = async () => {
            if (selectedVideo) {
                try {
                    const response = await fetch(captionLinks[selectedVideo])
                    const data = await response.text()
                    const parsedCaptions = parseSRT(data).map((caption) => ({
                        ...caption,
                        text: caption.text.split('<br />').join('\n'),
                    }))

                    setCaptions(parsedCaptions)
                } catch (error) {
                    console.error('Error loading captions:', error)
                    setCaptions([])
                }
            }
        }

        loadCaptions()
    }, [selectedVideo, captionLinks])

    return { captions, setCaptions }
}
