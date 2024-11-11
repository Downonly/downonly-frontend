import { type FC, useEffect, useRef, useState } from 'react'
import { formatDuration } from '@/utils/time'
import { useChanged } from '@/hooks/useChanged'

const Countdown: FC<{ seconds: number }> = ({ seconds }) => {
	const [localSeconds, setLocalSeconds] = useState(seconds)
	const timeout = useRef<number>()

	useChanged(seconds, () => {
		window.clearTimeout(timeout.current)
		setLocalSeconds(seconds)
	})

	useEffect(() => {
		timeout.current = window.setTimeout(() => {
			setLocalSeconds(Math.max(0, localSeconds - 1))
		}, 1000)

		return () => {
			window.clearTimeout(timeout.current)
		}
	}, [localSeconds, seconds])

	return <>{formatDuration(localSeconds)}</>
}

export default Countdown
