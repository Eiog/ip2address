module.exports = {
  apps: {
    name: "ip2address",
    script: "./dist/index.js",
  },
  deploy: {
    production: {
      user: "root",
      host: "101.200.179.232",
      ref: "origin/main",
      repo: "git@github.com:a-mans/ip2address.git",
      path: "/usr/www/ip2address",
      "pre-deploy-local": "",
      "post-deploy": "pnpm i && pnpm run build && PORT=3701 pm2 start",
      "pre-setup": "",
    },
  },
};
