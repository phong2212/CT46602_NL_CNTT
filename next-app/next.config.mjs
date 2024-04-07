/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { hostname: 'localhost' },
            { hostname: 'img.clerk.com' },
        ],
    },
};

export default nextConfig;
