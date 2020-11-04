# Lab 4

We will now create a continuous delivery pipeline using AWS CodePipeline that will:

- Fetch source code from GitHub
- Build an application
- Deploy the application to our AWS ElasticBeanstalk QA environment
- Deploy the application to our AWS ElasticBeanstalk Production environment after manual approval

For this lab, you will need to be in the `~/environment/aws-vls-cpt-ci_cd_workshop/labs/04-pipeline` directory in Cloud9:

  ```console
  $ cd ~/environment/aws-vls-cpt-ci_cd_workshop/labs/04-pipeline
  ```

## Create the Service Role

Create an [IAM Service Role](https://docs.aws.amazon.com/IAM/latest/UserGuide/using-service-linked-roles.html) that will be assumed by CodePipeline:

  ```console
  aws iam create-role --role-name AWSCodePipelineServiceRole --assume-role-policy-document file://AssumeRolePolicyDocument.json
  ```

### Create the IAM Policy

Create an [IAM policy](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) that will define the permissions granted to AWS CodePipeline:

  ```console
  aws iam create-policy --policy-name AWSCodePipelinePolicy --policy-document file://Policy.json
  ```

### Attach IAM Policy to Service Role

Attach the IAM Policy we created to the `AWSCodePipelineServiceRole` we created earlier.

Replace `[ACCOUNT NUMBER]` in the command below with your AWS account number:

  ```console
  aws iam attach-role-policy --policy-arn arn:aws:iam::[ACCOUNT NUMBER]:policy/AWSCodePipelinePolicy --role-name AWSCodePipelineServiceRole
  ```

### Create the Pipeline

Create the pipeline using the provided `CodePipeline.json` file. There are a few placeholder values we will need to update first and they are surrounded by square (`[` and `]`) brackets.

1. Replace `[CodePipelineServiceRoleArn]` with the ARN of the IAM role we created earlier. Example:
   `"roleArn": "arn:aws:iam::0123456789:role/service-role/AWSCodePipelineServiceRole",`

2. Create an S3 bucket that will store our artifacts. Give your bucket a unique name:

    ```console
    aws s3 mb s3://codepipeline-eu-west-1-1234567890
    ```

3. Replace `[ArtifactStoreBucket]` with your S3 bucket's name

4. Create the pipeline:

    ```console
    aws codepipeline create-pipeline --cli-input-json file://CodePipeline.json
    ```

### Test the Pipeline

Pushing a commit to your repository should trigger the pipeline. Lets test this out now:

  ```console
  touch newfile.txt
  git add newfile.txt
  git commit -m "Test pipeline execution"
  git push
  ```

Navigate to the [CodePipeline Console](https://eu-west-1.console.aws.amazon.com/codesuite/codepipeline/pipelines) and you will notice that a new pipeline execution has been automatically kicked off.

Click on the pipeline to view the various stages it executes. The pipeline will pause after deploying to the QA Elastic Beanstalk environment and you can manually approve the deployment to the Production Elastic Beanstalk Environment.
