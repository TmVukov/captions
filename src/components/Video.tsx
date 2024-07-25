import classNames from 'classnames'
import { useCallback, useEffect } from 'react'
import { VideoProps } from '../types'

const Video = ({
    captions,
    selectedVideo,
    currentCaption,
    isLoading,
    videoLinks,
    videoRef,
    controlsRef,
    setCurrentCaption,
    setSelectedVideo,
    setCaptions,
    setIsLoading,
}: VideoProps) => {
    const handleTimeUpdate = () => {
        if (videoRef?.current) {
            const currentTime = videoRef.current.currentTime
            const currentCaption = captions.find(
                (caption) =>
                    currentTime >= caption.start && currentTime <= caption.end
            )

            setCurrentCaption(currentCaption)
        }
    }

    const handleVideoSelect = useCallback(
        (videoNumber: number) => {
            setCaptions([])
            setSelectedVideo(videoNumber)
            setIsLoading(true)

            if (videoRef?.current) {
                videoRef.current.src = videoLinks[videoNumber]
                videoRef.current.load()
            }
        },
        [videoLinks, videoRef, setCaptions, setSelectedVideo, setIsLoading]
    )

    const setButtonClasses = (videoNumber: number) => {
        return classNames('rounded-xl px-3 py-2 mr-3', {
            'bg-indigo-500 text-white': selectedVideo === videoNumber,
            'bg-white text-black': selectedVideo !== videoNumber,
        })
    }

    const videoClasses = classNames('w-auto h-auto', {
        hidden: isLoading,
        block: !isLoading,
    })

    const currentCaptionClasses = classNames({
        'absolute bottom-7 rounded px-3 py-2 bg-gray-800 text-white text-sm':
            currentCaption,
        hidden: !currentCaption,
    })

    useEffect(() => {
        handleVideoSelect(1)
    }, [handleVideoSelect])

    return (
        <div className="w-3/4">
            <div className="relative flex justify-center items-center min-h-96">
                {isLoading && <div className="spinner" />}
                <video
                    ref={videoRef}
                    controls
                    onTimeUpdate={handleTimeUpdate}
                    onCanPlay={() => setIsLoading(false)}
                    className={videoClasses}
                ></video>
                <div className={currentCaptionClasses}>
                    {currentCaption?.text}
                </div>
            </div>
            <div
                ref={controlsRef}
                className="flex justify-center items-center min-h-10 p-3"
            >
                <button
                    onClick={() => handleVideoSelect(1)}
                    className={setButtonClasses(1)}
                >
                    Video 1
                </button>
                <button
                    onClick={() => handleVideoSelect(2)}
                    className={setButtonClasses(2)}
                >
                    Video 2
                </button>
            </div>
        </div>
    )
}

export default Video
