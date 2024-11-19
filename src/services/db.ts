/*
	eslint-disable
	@typescript-eslint/no-unsafe-assignment,
	@typescript-eslint/no-unsafe-call,
	@typescript-eslint/no-unsafe-return
*/
import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
	return new PrismaClient()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
	prisma: PrismaClientSingleton
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()
export const tableMints = prisma.mints37
export const tablePushing = prisma.pushing

export default prisma

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
