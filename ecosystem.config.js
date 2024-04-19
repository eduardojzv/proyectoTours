module.exports = {
  apps: [
    {
      name: 'NextAppName',
      script: 'node_modules/next/dist/bin/next',
      args: 'dev',
      watch: true,
      env_dev: {
        APP_ENV: 'dev'
      },
    }
  ]
}
