import { Html } from '@react-three/drei'
import Loading from '@/components/loading/loading'

export default function Placeholder(props: {
	className?: string
	style?: React.CSSProperties
}): JSX.Element {
	return (
		<Html className={`${props.className ?? ''}`} style={props.style}>
			<Loading className="-translate-x-1/2 -translate-y-5 scale-150" />
		</Html>
	)
}
