# Credentials Folder

## The purpose of this folder is to store all credentials needed to log into your server and databases. This is important for many reasons. But the two most important reasons is
    1. Grading , servers and databases will be logged into to check code and functionality of application. Not changes will be unless directed and coordinated with the team.
    2. Help. If a class TA or class CTO needs to help a team with an issue, this folder will help facilitate this giving the TA or CTO all needed info AND instructions for logging into your team's server. 


# Below is a list of items required. Missing items will causes points to be deducted from multiple milestone submissions.

1. Server URL or IP: http://3.101.143.240
2. SSH username: ubuntu
3. SSH password or key: SSH key inside team1.pem file
    <br> If a ssh key is used please upload the key to the credentials folder.
4. Database URL or IP and port used.
    <br><strong> NOTE THIS DOES NOT MEAN YOUR DATABASE NEEDS A PUBLIC FACING PORT.</strong> But knowing the IP and port number will help with SSH tunneling into the database. The default port is more than sufficient for this class.
5. Database username: admin
6. Database password: team1
7. Database name (basically the name that contains all your tables): csc648-team1-db
8. Instructions on how to use the above information.

### Instructions for SSHing into AWS EC2 instance
1. Move the copy of team1.pem file into your ~/.ssh folder (Usually hidden).
2. Open terminal/cmd/powershell.
3. Enter the following command on the team1.pem file: chmod 400 ~/.ssh/team1.pem
4. Enter the following command: ssh -i "~/.ssh/team1.pem" ubuntu@3.101.143.240
5. You should see a welcome message by Ubuntu. You are now in the AWS virtual machine!

# Most important things to Remember
## These values need to kept update to date throughout the semester. <br>
## <strong>Failure to do so will result it points be deducted from milestone submissions.</strong><br>
## You may store the most of the above in this README.md file. DO NOT Store the SSH key or any keys in this README.md file.

