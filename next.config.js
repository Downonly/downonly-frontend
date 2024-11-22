/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	distDir: 'dist',
	reactStrictMode: false,
	basePath: process.env.MODE === 'gh_pages' ? '/downonly' : '',
}

module.exports = nextConfig
