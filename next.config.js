/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '4221',
            }
        ]
    }
}

module.exports = nextConfig
