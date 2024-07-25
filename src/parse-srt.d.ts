declare module 'parse-srt' {
    function parseSRT(srt: string): Array<{
        id: number
        start: number
        end: number
        text: string
    }>
    
    export = parseSRT
}
