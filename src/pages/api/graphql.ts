import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { PrismaClient } from '@prisma/client'
import prisma from '@/services/db'
import { typeDefs } from '@/graphql/schema'
import { resolvers } from '@/graphql/resolvers'

export interface Context {
	prisma: PrismaClient
}

const apolloServer = new ApolloServer<Context>({ typeDefs, resolvers })

export default startServerAndCreateNextHandler(apolloServer, {
	// eslint-disable-next-line @typescript-eslint/require-await, @typescript-eslint/no-unsafe-assignment
	context: async (req, res) => ({ req, res, prisma }),
})
