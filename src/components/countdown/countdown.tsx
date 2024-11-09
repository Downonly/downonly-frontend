import { type FC, useEffect, useRef, useState } from 'react'
import { formatDuration } from '@/utils/time'

const Countdown: FC<{ seconds: number }> = ({ seconds }) => {
	const [localSeconds, setLocalSeconds] = useState(seconds)
	const timeout = useRef<number>()

	useEffect(() => {
		timeout.current = window.setTimeout(() => {
			if (localSeconds <= 1) {
				setLocalSeconds(seconds)
			} else {
				setLocalSeconds(Math.max(0, localSeconds - 1))
			}
		}, 1000)

		return () => {
			window.clearTimeout(timeout.current)
		}
	}, [localSeconds, seconds])

	return <>{formatDuration(localSeconds)}</>
}

export default Countdown
