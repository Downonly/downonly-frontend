/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	distDir: 'dist',
	basePath: process.env.MODE === 'gh_pages' ? '/downonly' : '',
}

module.exports = nextConfig
