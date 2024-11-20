import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
	if (process.env.NODE_ENV !== 'production' || !process.env.BASIC_AUTH) {
		return NextResponse.next()
	}

	const [authUser, authPass] = process.env.BASIC_AUTH.split(':')

	const authHeader = req.headers.get('authorization')

	if (!authHeader) {
		return new NextResponse('Authentication required', {
			status: 401,
			headers: { 'WWW-Authenticate': 'Basic' },
		})
	}

	const [scheme, encoded] = authHeader.split(' ')
	if (scheme !== 'Basic') return NextResponse.next()

	const decoded = Buffer.from(encoded, 'base64').toString()
	const [user, pass] = decoded.split(':')

	if (user === authUser && pass === authPass) {
		return NextResponse.next()
	}

	return new NextResponse('Invalid credentials', {
		status: 401,
		headers: { 'WWW-Authenticate': 'Basic' },
	})
}

export const config = {
	matcher: '/:path*',
}
