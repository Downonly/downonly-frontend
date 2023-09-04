/*
	eslint-disable
	@typescript-eslint/no-unsafe-assignment,
	@typescript-eslint/no-unsafe-call,
	@typescript-eslint/no-unsafe-member-access,
	@typescript-eslint/no-unsafe-return
*/
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/services/db'

async function allMints() {
	const allMints = await prisma.mints.findMany()
	return allMints
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'GET') {
		const mints = await allMints()
		res.status(200).json(mints)
	} else {
		res.status(400)
	}
}
