module.exports = {
  apps: [{
    name: 'prod-server',
    cwd:'/home/ubuntu/prod/source/application',
    script: './Server/index.js',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '3.101.39.111',
      key: '~/.ssh/team1.pem',
      ref: 'origin/main',
      repo: 'git@github.com:CSC-648-SFSU/csc648-03-sp22-Team01.git',
      path: '/home/ubuntu/prod',
      'post-deploy': 'cd ./application/Server && npm install && cd ../ && pm2 reload ecosystem.config.js --env production'
    }
  }
}