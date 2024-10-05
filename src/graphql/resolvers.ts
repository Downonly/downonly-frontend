import { table } from '@/services/db'

export const resolvers = {
	Query: {
		// get mint by id
		mint: async (_parent: never, args: { id: number }) => {
			return await table.findUnique({
				where: {
					id: args.id,
				},
			})
		},
		// get all mints
		mints: async () => {
			return await table.findMany()
		},
	},
}
