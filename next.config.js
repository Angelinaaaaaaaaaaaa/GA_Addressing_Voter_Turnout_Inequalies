module.exports = {

    webpack(config) {
        config.module.rules.push({
            test: /\.geojson$/,
            type: 'json',
        });

        return config;
    },
};
