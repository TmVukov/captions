import { useMemo, useRef, useState } from 'react'
import Captions from './components/Captions'
import Video from './components/Video'
import { useLoadCaptions } from './hooks/useLoadCaptions'
import { useOuterHeight } from './hooks/useOuterHeight'
import { Caption, CaptionLinks, VideoLinks } from './types'

function App() {
    const [selectedVideo, setSelectedVideo] = useState<number | null>(null)
    const [currentCaption, setCurrentCaption] = useState<Caption | undefined>(
        undefined
    )
    const [isLoading, setIsLoading] = useState(false)

    const videoRef = useRef<HTMLVideoElement | null>(null)
    const controlsRef = useRef<HTMLDivElement | null>(null)

    const videoLinks = useMemo<VideoLinks>(
        () => ({
            1: '/video1/clip.mp4',
            2: '/video2/clip.mp4',
        }),
        []
    )

    const captionLinks = useMemo<CaptionLinks>(
        () => ({
            1: '/video1/captions.srt',
            2: '/video2/captions.srt',
        }),
        []
    )

    const { captions, setCaptions } = useLoadCaptions(
        selectedVideo,
        captionLinks
    )

    const { outerHeight } = useOuterHeight(videoRef, controlsRef, isLoading)

    const videoProps = {
        captions,
        selectedVideo,
        currentCaption,
        videoLinks,
        videoRef,
        controlsRef,
        isLoading,
        setCurrentCaption,
        setSelectedVideo,
        setCaptions,
        setIsLoading,
    }

    const captionsProps = {
        captions,
        currentCaption,
        outerHeight,
        videoRef,
        isLoading,
        setCurrentCaption,
    }

    return (
        <div className="container flex p-3 rounded-lg bg-gray-600">
            <Video {...videoProps} />
            <Captions {...captionsProps} />
        </div>
    )
}

export default App
