/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
            },
        ],
    },
    experimental: {
        optimizePackageImports: [
            '@react-three/fiber',
            'three',
            "@mux/blurhash",
            "@mux/mux-player-react",
            "@portabletext/react",
            "@react-three/drei",
            "next-sanity",
            "sanity-plugin-mux-input"
        ],
    },
};

export default nextConfig;
