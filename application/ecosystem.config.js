/*********************************************************************
 * Purpose: Sets app build version up for deploying to production
 * Input: Team 1's remote repository
 * Output: A copy of the repository inside the AWS Ubuntu virtual
 * machine to serve the prod-client and prod-server
 * Error Messages: Deployment setup fails if the previous repo copy
 * inside the virtual machine was not removed prior to redeploying
 * Author: Thomas Nguyen
 *********************************************************************/
module.exports = {
  apps: [{
    name: 'prod-server',
    cwd:'/home/ubuntu/prod/source/application',
    script: './Server/index.js',
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '54.67.78.9',
      key: '~/.ssh/team1.pem',
      ref: 'origin/test-deploy',
      repo: 'git@github.com:CSC-648-SFSU/csc648-03-sp22-Team01.git',
      path: '/home/ubuntu/prod',
      'post-deploy': 'cd ./application/Server && npm install && cd ../ && pm2 reload ecosystem.config.js --env production && pm2 serve ./client/build 3000 --name prod-client'
    }
  }
}