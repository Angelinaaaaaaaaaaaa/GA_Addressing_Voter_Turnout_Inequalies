/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
}

module.exports = {

    webpack(config) {
        config.module.rules.push({
            test: /\.geojson$/,
            type: 'json',
        });

        return config;
    },
};
