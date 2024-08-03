/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: '/backend/:path*',
                destination: 'http://localhost:3001/api/:path*'
            }
        ]
    }
};

export default nextConfig;
