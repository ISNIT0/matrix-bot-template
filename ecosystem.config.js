module.exports = {
    apps: [{
        name: "matrix-bot",
        script: "./index.js",
        watch: true,
        instances: 1,
        env_production: {
            NODE_ENV: "production"
        }
    }]
};