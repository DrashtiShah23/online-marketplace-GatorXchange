module.exports = {
  apps: [{
    name: 'csc648-03-sp22-Team01',
    cwd:'/home/ubuntu/prod/source/application/Server',
    script: './application/Server/index.js',
  }],
  deploy: {
    production: {
      user : 'ubuntu',
      host : '13.57.227.29',
      key  : '~/.ssh/test.pem',
      ref: 'origin/souza-test',
      repo: 'git@github.com:CSC-648-SFSU/csc648-03-sp22-Team01.git',
      path: '/home/ubuntu/prod',
      'post-deploy': '(cd ./application/Server) &&npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}