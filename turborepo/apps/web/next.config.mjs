/** @type {import('next').NextConfig} */
const nextConfig = {
    // "distDir": "output",
    // basePath: "/liy",
    // images: {

    // },
    // output: 'standalone',
    // async headers() {
    //     return [
    //         {
    //             source: '/:name*',
    //             headers: [
    //                 {
    //                     key: 'test-key',
    //                     value: 'test-value :name*'
    //                 }
    //             ],
    //             has: [
    //                 {
    //                     type: 'cookie',
    //                     key: 'name',
    //                     value: 'liy'
    //                 }
    //             ],
    //         }
    //     ]
    // },
    // async redirects() {
    //     return [
    //         {
    //             source: '/test2',
    //             destination: '/test',
    //             permanent: false
    //         }
    //     ]
    // },
    // async rewrites() {
    //     return [
    //         {
    //             source: '/test2',
    //             destination: '/test'
    //         },
    //         {
    //             source: '/test3',
    //             destination: 'http://localhost:3001/',
    //             // basePath: false,
    //         },
    //     ]
    // },
    experimental: {
        serverActions: {
            bodySizeLimit: '2mb',
        },
        taint: true,
        ppr: 'incremental',
    },
    async rewrites() {
        return [
            {
                'source': '/docs/api/:path*',
                'destination': 'http://localhost:3001/api/:path*'
            }
        ]
    }
};

export default nextConfig;
