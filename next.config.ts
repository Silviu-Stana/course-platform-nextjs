import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        remotePatterns: [
            new URL('https://utfs.io/**'),
            new URL('https://nxs1yg1nhl.ufs.sh/**'),
        ],
    },
};

export default nextConfig;
