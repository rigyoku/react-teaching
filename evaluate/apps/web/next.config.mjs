/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/af',
    redirects: async () => [
        {
            source: '/:path/demo',
            missing: [
                {
                    type: 'cookie',
                    key: 'name',
                    value: 'af',
                }
            ],
            destination: 'http://www.baidu.com',
            permanent: true,
        },
    ]
};

export default nextConfig;
