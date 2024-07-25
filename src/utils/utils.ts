import { addSeconds, format, startOfDay } from 'date-fns'

export const formatTime = (seconds: number) => {
    const date = startOfDay(new Date(0))
    const formattedDate = addSeconds(date, seconds)
    return format(formattedDate, 'mm:ss')
}
