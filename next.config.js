/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: 'dist',
	reactStrictMode: false,
	// basePath: process.env.MODE === 'gh_pages' ? '/downonly' : '',
}

module.exports = nextConfig
