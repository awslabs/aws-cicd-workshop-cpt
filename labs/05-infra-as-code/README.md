# Lab 5

## Infrastructure as code
We will now create Launch a CloudFormation Stack through the AWS CLI. After running through the Lab you will be able to better understand:

- How to launch a Stack from a YAML formatted file
- Deploy the Stack through the AWS CLI

For this lab, you will need to be in the `~/environment/aws-vls-cpt-ci_cd_workshop/labs/05-infra-as-code` directory in Cloud9:

  ```console
  $ cd ~/environment/aws-vls-cpt-ci_cd_workshop/labs/05-infra-as-code
  ```

## Create the Stack

Create the stack with resources Defined in the *cfn-template.yml* in the current directory
- Be sure to Update the [YOUR STACK NAME] in the command bellow to a name of your choosing

  ```console
  aws cloudformation create-stack --stack-name [YOUR STACK NAME] --template-body file://cfn-template.yml
  ```
  
- You are also able to pass in parameters through the CLI, in this case you can name the DynamoDB table that is created through passing TableName
 
  ```console
  aws cloudformation create-stack --stack-name [YOUR STACK NAME] --template-body file://cfn-template.yml --parameters ParameterKey=TableName,ParameterValue=artistTable
  ```

Output
  ```
  {
    "StackId": "arn:aws:cloudformation:eu-west-1:XXXXXXXXXXXXX:stack/[YOUR STACK NAME]/8832c420-5bc7-11eb-8215-06834f7e094f"
  }
  ```

##  Describe the status of the CloudFormation Stack Creation

Keep an eye out for "StackStatus"

  ```console
  aws cloudformation describe-stacks --stack-name [YOUR STACK NAME]
  ```
You can also view the status through the console 
Navigate to the [Cloudformation Console](https://eu-west-1.console.aws.amazon.com/cloudformation) Select your stack to view the Events.