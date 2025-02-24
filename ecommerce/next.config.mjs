/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        webpackBuildWorker: true,
    },
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "**", // Allow images from this domain
          },
          {
            protocol: "http",
            hostname: "**", // Allow images from this CDN domain
          },
        ],
    },
    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));
        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/, // *.svg?url
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: {
                    loader: '@svgr/webpack',
                    options: {
                        prettier: false,
                        svgo: false,
                    },
                },
            },
        );

        fileLoaderRule.exclude = /\.svg$/i;

        return config;
    },
};

export default nextConfig;
