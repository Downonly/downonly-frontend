/*
	eslint-disable
	@typescript-eslint/no-unsafe-assignment,
	@typescript-eslint/no-unsafe-call,
	@typescript-eslint/no-unsafe-member-access,
	@typescript-eslint/no-unsafe-return
*/
import type { NextApiRequest, NextApiResponse } from 'next'
import { tableMints, tablePushing } from '@/services/db'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		try {
			const mints = await tableMints.findMany()
			const pushing = (await tablePushing.findFirst())?.isPushing ?? false
			res.status(200).json({ mints, pushing })
		} catch (err) {
			console.error('Failed to query database.', err)
			res.status(500)
		}
	} else {
		res.status(400)
	}
}
