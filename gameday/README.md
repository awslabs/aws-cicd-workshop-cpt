# GameDay

## Scenario

A customer “Awesome Inc”, has reached out to ask for help in implementing a suitable solution for storing, building and deploying an application within AWS. Here is a break down of their key requirements:

-    They have 20 developers and require a effective way to store and version the code. 
-    Have vaguely heard of CI/CD and would like to leverage it while incorporating best practices
-    Would prefer to have a at least a testing and production environment and deployments to production should be approved By the CTO. 

They are looking for a Proof of concept that can be used to highlight the benefits of using CI/CD with

## Request

Please create a suitable Proof of concept for Awesome Inc and share it with them using the submission script. In terms of code, feel free to sue any sample code (even the one from the labs) to issrate the point. However please note that the code will be subimited to ensure that Awesome Inc can recreate the CI/CD Proof of Concept.

## Submission

The [submission script](./submission.sh) will create a zip containing the code in the folder it is run and will describe the CI/CD related infrastuture in the account. The script will then uplaod it to an S3 bucket belonging to Awesome Inc and will be deleted after the evalation period.  

To run the script:

1. Download collection script ([submission.sh](./submission.sh)) from GitHub
2. Place the script in the root folder of your repo within a cloud9 environemnt.
3. Make the script executable. (chmod +x submission.sh)
4. Excute the script, ./submission.sh. Please note that the script will ask for your name and email address at the start to help keep track of the submissions. Alternatively, you can use the NAME and EMAIL environment variables respectively to provide these detials. 