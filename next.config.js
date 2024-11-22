/** @type {import('next').NextConfig} */
const nextConfig = {
	output: process.env.MODE === 'gh_pages' ? 'export' : undefined,
	distDir: 'dist',
	reactStrictMode: false,
	basePath: process.env.MODE === 'gh_pages' ? '/downonly-frontend' : '',
	assetPrefix: process.env.MODE === 'gh_pages' ? '/downonly-frontend' : '',
}

module.exports = nextConfig
