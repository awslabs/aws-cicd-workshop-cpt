# Lab 2 - CodeBuild

In this lab we will create a simple CodeBuild project along with the crucial BuildSpec file which will be used when running builds within the CodeBuild project. 

Outcomes:
* Create IAM role for CodeBuild project
* Create a CodeBuild project
* Start a build within the project 
* Running a build vs CodePipeline triggered builds
* Troubleshooting a build/viewing logs and phase details

## Create IAM role for CodeBuild project
Before creating the CodeBuild project an IAM role is required which will allow the CodeBuild service permission to other services such as S3. The creation of the CodeBuild service role can be done from the AWS cli or the console. [IAM service role creation](https://docs.aws.amazon.com/codebuild/latest/userguide/setting-up.html#setting-up-service-role) 


## Create CodeBuild project - CLI

To create a CodeBuild project use either the console or AWS CLI, in this example the CLI will be used to quickly create a simple build project.

One of the pre-requisites for creating a build project is the buildspec.yml file which is collection of commands run during the build, these commands perform the processing on the artifacts collected from the source and then output the artifacts to either the next stage in a CodePipeline or to an S3 bucket. Notice in the source repository, we have a buildspec file with our commands.

Next use the below AWS cli command as a base replacing the --name, --source and --service-role with values from your own account:
* --name: Any name can be provided here
* --source: Use the URL copied from the CodeCommit clone for HTTPS [CodeCommit-URL-example](https://docs.aws.amazon.com/codecommit/latest/userguide/how-to-connect.html#how-to-connect-http)
* --service-role: 

```
aws codebuild create-project --name "CodeBuildVLSDemo" --source "{\"type\": \"CODECOMMIT\",\"location\": \"https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/CICD\"}" --artifacts {"\"type\": \"NO_ARTIFACTS\""} --environment "{\"type\": \"LINUX_CONTAINER\",\"image\": \"aws/codebuild/amazonlinux2-x86_64-standard:3.0\",\"computeType\": \"BUILD_GENERAL1_MEDIUM\"}" --service-role "arn:aws:iam::xxxxxxxxxxxx:role/service-role/codebuild-CodeBuildVLS-service-role"
```
Note: The service role used must have permissions to access the CodeCommit repository

## Create CodeBuild project - CloudFormation

Alternatively we have a CloudFormation template [CodeBuild_project.yml](./CodeBuild_project.yml) in this directory, which will create the same CodeBuild project as the above steps with the CLI.

## Start a build within the project
The next step is to start a build, however, before starting the build modify the S3 copy command which can be found in the buildspec.yml file so that a bucket from your account is used. 
The below action will start a build which downloads the source from the repository, sets up the build environment and starts processing the buildspec.yml file.  

```
aws codebuild start-build --project-name "CodeBuildVLSDemo" --queued-timeout-in-minutes-override 5 --artifacts-override {"\"type\": \"NO_ARTIFACTS\""} --source-version "main"
```

Once the build has been started the build details can be viewed from either the console or the AWS cli. 
Use the below command to view the build details from the AWS cli.

```
aws codebuild batch-get-builds --ids <ids>
```

## Running a build vs CodePipeline triggered builds
CodeBuild projects can triggered automatically when part of a CodePipeline, the pipeline artifacts are processed by the build project and then moved to the next stage in the pipeline. In addition, to running a build project as part of a pipeline a build project can also be triggered using a Lambda function, however, the most used method for build invocations is when integrated in a CodePipeline. 

## Troubleshooting a build/viewing logs and phase details
When a build fails the first place to start looking is the phase details and build logs, by checking which phase the build failed on and searching for that phase in the builds logs the issue can quickly found and fixed. Phase details can be found on the CodeBuild console by selecting the failed build, in the same place the build logs can also be selected for review. The source directory in a build using a linux image is /codebuild/output/srcXXXXXXX/src. For more advanced troubleshooting a [codebuild-breakpoint](https://docs.aws.amazon.com/codebuild/latest/userguide/session-manager.html) can be added to the buildspec.yml, this command will cause the build to pause and allow logins to the build session using the SSM service. Once logged into the build session commands can be manually run in an effort to retrieve more information. Once troubleshooting the build has been completed the build can be resumed. 