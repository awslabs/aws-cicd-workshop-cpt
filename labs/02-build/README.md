# Lab 2 - CodeBuild

In this lab we will create a simple CodeBuild project along with the crucial BuildSpec file which will be used when running builds within the CodeBuild project. 

Outcomes:
* Create a CodeBuild project
* Start a build within the project 
* How CodeBuild fits in with a CodePipeline
* How CodeBuild handles the input source
* Running a build vs CodePipeline triggered builds
* Troubleshooting a build/viewing logs and phase details

## Creating a CodeBuild project
To create a CodeBuild project use either the console or AWS cli, in this example the cli will be used to quickly create a simple build project.
One of the pre-requisites for creating a build project is the buildspec.yml file which is collection of commands run during the build, these commands perform the processing on the artifacts collected from the source and then output the artifacts to either the next stage in a CodePipeline or to an S3 bucket. 

Before creating the CodeBuild project clone and upload the buildspec.yml, pom.xml and src folder to a CodeCommit repository with your account.

Next use the below AWS cli command as a base replacing the --name, --source and --service-role with values from your own account:
* --name: Any name can be provided here
* --source: Use the URL copied from the CodeCommit clone for HTTPS [CodeCommit-URL-example](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-connect.html#how-to-connect-http)
* --service-role: Create a service role for the CodeBuild project [CodeBuild-IAM-role](https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up.html#setting-up-service-role)
```
aws codebuild create-project --name "CodeBuildVLSDemo" --source "{\"type\": \"CODECOMMIT\",\"location\": \"https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/CodeCommitVLS\"}" --artifacts {"\"type\": \"NO_ARTIFACTS\""} --environment "{\"type\": \"LINUX_CONTAINER\",\"image\": \"aws/codebuild/amazonlinux2-x86_64-standard:3.0\",\"computeType\": \"BUILD_GENERAL1_SMALL\"}" --service-role "arn:aws:iam::xxxxxxxxxxxx:role/service-role/codebuild-CodeBuildVLS-service-role"
```
Note: The service role used must have permissions to access the CodeCommit repository

```
aws codebuild start-build --project-name "CodeBuildVLSDemo" --queued-timeout-in-minutes-override 5 --artifacts-override {"\"type\": \"NO_ARTIFACTS\""} --source-version "master"
```
