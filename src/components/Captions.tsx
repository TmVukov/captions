import classNames from 'classnames'
import { useRef } from 'react'
import { useInnerHeight } from '../hooks/useInnerHeight'
import { useScrollToCaption } from '../hooks/useScrollToCaption'
import { Caption, CaptionsProps } from '../types'
import { formatTime } from '../utils/utils'

const Captions = ({
    captions,
    currentCaption,
    outerHeight,
    videoRef,
    setCurrentCaption,
}: CaptionsProps) => {
    const captionsRef = useRef<HTMLDivElement | null>(null)
    const captionsTitleRef = useRef<HTMLHeadingElement | null>(null)

    useScrollToCaption(currentCaption)
    const { innerHeight } = useInnerHeight(captionsTitleRef, outerHeight)

    const handleCaptionClick = (caption: Caption) => {
        if (videoRef?.current) {
            videoRef.current.currentTime = caption.start
            videoRef.current.play()
            setCurrentCaption(caption)
        }
    }

    const setCaptionClasses = (caption: Caption) => {
        return classNames('px-3 py-2 rounded-lg text-left', {
            'bg-indigo-500 text-white': currentCaption?.id === caption.id,
            'hover:cursor-pointer hover:bg-gray-300 hover:text-white':
                currentCaption?.id !== caption.id,
        })
    }

    return (
        <div
            className="w-1/4 bg-white overflow-hidden"
            style={{ height: outerHeight }}
        >
            <h1 ref={captionsTitleRef} className="font-bold text-center py-2">
                Captions
            </h1>
            <div
                className="overflow-y-scroll scrollable-element px-3"
                style={{ height: innerHeight }}
            >
                <div ref={captionsRef}>
                    {captions.map((caption, index) => (
                        <div
                            key={index}
                            id={`caption-${caption.id}`}
                            onClick={() => handleCaptionClick(caption)}
                            className={setCaptionClasses(caption)}
                        >
                            <span className="mr-2">
                                {formatTime(caption.start)}
                            </span>
                            <span>{caption.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Captions
