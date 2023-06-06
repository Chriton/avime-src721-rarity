/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        // topLevelAwait: true,
        // serverActions: true,
    },
    productionBrowserSourceMaps: false,
}

module.exports = nextConfig
