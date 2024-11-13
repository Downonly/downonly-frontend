import { type FC } from 'react'
import { formatUnits } from 'ethers'

const Eth: FC<{ eth: bigint }> = ({ eth }) => {
	return <>{Number(formatUnits(eth, 'ether')).toFixed(5)} ETH</>
}

export default Eth
