import { Context } from '@/pages/api/graphql'

export const resolvers = {
	Query: {
		// get mint by id
		mint: async (_parent: never, args: { id: number }, context: Context) => {
			return await context.prisma.mints.findUnique({
				where: {
					id: args.id,
				},
			})
		},
		// get all mints
		mints: async (_parent: never, _args: never, context: Context) => {
			return await context.prisma.mints.findMany()
		},
	},
}
