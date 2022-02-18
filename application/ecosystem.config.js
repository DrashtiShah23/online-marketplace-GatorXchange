module.exports = {
  apps: [{
    name: 'csc648-03-sp22-Team01',
    script: './application/server/index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-54-183-182-205.us-west-1.compute.amazonaws.com',
      key: '~/.ssh/team1.pem',
      ref: 'origin/main',
      repo: 'git@github.com:CSC-648-SFSU/csc648-03-sp22-Team01.git',
      path: '/home/ubuntu/csc648-03-sp22-Team01',
      'post-deploy': 'npm install && pm2 startOrRestart /home/ubuntu/csc648-03-sp22-Team01/source/application/server/ecosystem.config.js'
    }
  }
}