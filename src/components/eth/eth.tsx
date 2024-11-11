import { type FC } from 'react'
import { formatUnits } from 'ethers'

const Eth: FC<{ eth: bigint }> = ({ eth }) => {
	return <>{formatUnits(eth, 'ether')} ETH</>
}

export default Eth
