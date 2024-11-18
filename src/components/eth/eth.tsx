import { type FC } from 'react'
import { formatUnits } from 'ethers'

const Eth: FC<{ eth: bigint }> = ({ eth }) => {
	return <>{Math.round(1e5 * Number(formatUnits(eth, 'ether'))) / 1e5} ETH</>
}

export default Eth
