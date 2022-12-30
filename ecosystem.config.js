module.exports = {
  apps: {
    name: "ip2address 3701",
    script: "./dist/index.js",
  },
  deploy: {
    production: {
      user: "root",
      host: "158.247.218.144",
      ref: "origin/main",
      repo: "git@github.com:xsrole/ip2address.git",
      path: "/root/www/ip2address",
      "pre-deploy-local": "",
      "post-deploy": "pnpm i && pnpm run build && PORT=3701 pm2 start",
      "pre-setup": "",
    },
  },
};
