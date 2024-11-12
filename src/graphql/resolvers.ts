import { tableMints } from '@/services/db'

export const resolvers = {
	Query: {
		// get mint by id
		mint: async (_parent: never, args: { id: number }) => {
			return await tableMints.findUnique({
				where: {
					id: args.id,
				},
			})
		},
		// get all mints
		mints: async () => {
			return await tableMints.findMany()
		},
	},
}
