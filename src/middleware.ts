import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

// Extract the username and password from environment variables
const [AUTH_USER, AUTH_PASS] = (process.env.BASIC_AUTH ?? ':').split(':')

export function middleware(req: NextRequest) {
	if (process.env.NODE_ENV !== 'production' || !process.env.BASIC_AUTH) {
		return NextResponse.next()
	}

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

	if (user === AUTH_USER && pass === AUTH_PASS) {
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
