/** @type {import('next').NextConfig} */
const nextConfig = {
	output: 'export',
	trailingSlash: true,
	distDir: 'dist',
	basePath: process.env.MODE === 'local' ? '' : '/downonly',
}

module.exports = nextConfig
