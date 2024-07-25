import { Dispatch, RefObject, SetStateAction } from 'react'

export type VideoLinks = {
    [key: number]: string
}

export type CaptionLinks = {
    [key: number]: string
}

export type Caption = {
    id: number
    start: number
    end: number
    text: string
}

export type Captions = Caption[]

export type VideoProps = {
    captions: Captions
    selectedVideo: number | null
    isLoading: boolean,
    currentCaption: Caption | undefined
    videoLinks: VideoLinks
    videoRef: RefObject<HTMLVideoElement> | null
    controlsRef: RefObject<HTMLDivElement> | null
    setCurrentCaption: Dispatch<SetStateAction<Caption | undefined>>
    setSelectedVideo: Dispatch<SetStateAction<number | null>>
    setCaptions: Dispatch<SetStateAction<Captions>>
    setIsLoading: Dispatch<SetStateAction<boolean>>
}

export type CaptionsProps = {
    captions: Captions
    currentCaption: Caption | undefined
    outerHeight: number
    videoRef: RefObject<HTMLVideoElement> | null
    setCurrentCaption: Dispatch<SetStateAction<Caption | undefined>>
}
