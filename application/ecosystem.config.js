module.exports = {
  apps: [ {
    name: "app",
    script: "./src/index.js",
    max_restarts: 20,
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  } ]
}
