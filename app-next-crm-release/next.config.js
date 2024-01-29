/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	eslint: {
		ignoreDuringBuilds: true
	},
	images: {
		domains: ['via.placeholder.com', 'lh3.googleusercontent.com'],
		unoptimized: true
	},
	output: 'standalone',
	async rewrites() {
		return [
			// Rewrite everything under /admin/ to `pages/admin/index`
			{
				source: '/admin/:any*',
				destination: '/admin/'
			},
			// Rewrite everything under /agent/ to `pages/agent/index`
			{
				source: '/agent/:any*',
				destination: '/agent/'
			},
			// Rewrite everything else to `pages/index`
			{
				source: '/:any*',
				destination: '/'
			}
		]
	}
}

module.exports = nextConfig
