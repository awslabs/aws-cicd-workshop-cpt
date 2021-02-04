# Lab 3

## Creating and deploying a Node express server

# Lab - Elastic Beanstalk

We will create Elastic Beanstalk environment to manage the infrastructure consisting of:

- One Beanstalk Application
- Two Beanstalk environments (QA and Prod) inside the Beanstalk Application
- Switch between the two environments
For this lab, you will need to be in the ~/environment/aws-vls-cpt-ci_cd_workshop/labs/03 directory in Cloud9:

## Create Instance Profile Role

Create role that will be used by instances launched in your Elastic Beanstalk environment

```
aws iam create-role --role-name aws-elasticbeanstalk-ec2-role --assume-role-policy-document file://trust-policy.json
```

### Attach IAM Policy To Role

Attach the managed IAM Policy `AWSElasticBeanstalkFullAccess` to the `aws-elasticbeanstalk-ec2-role` we created earlier.

```
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess --role-name aws-elasticbeanstalk-ec2-role
```

## Create Elastic Beanstalk Application

Create an Elastic Beanstalk Application that will house the two environments - Prod and QA

```
aws elasticbeanstalk create-application --application-name VLS --description "vls application"
```

Check that the application has been successfully created

```
aws elasticbeanstalk describe-applications
```

## Create Elastic Beanstalk Environment For Prod

Check DNS availability for Prod environment

```
aws elasticbeanstalk check-dns-availability --cname-prefix [your-preferred-cname]
```

Example:
```
aws elasticbeanstalk check-dns-availability --cname-prefix vls-prod
{
    "Available": true, 
    "FullyQualifiedCNAME": "vls-prod.us-east-1.elasticbeanstalk.com"
}
```

Create Prod environment using available DNS name from previous step

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name [your-prod-env-name] \
--cname-prefix [your-preferred-cname] \
--solution-stack-name "64bit Amazon Linux 2 v5.2.4 running Node.js 12" \
--option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

Example:

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name vls-prod-env \
--cname-prefix vls-prod \
--solution-stack-name "64bit Amazon Linux 2 v5.2.4 running Node.js 12" \
--option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

Allow approximatley 5 minutes for the environment to create and thereafter check that it has created successfully:

```
aws elasticbeanstalk describe-environments --environment-names [your-prod-env-name]
```

Example:
```
aws elasticbeanstalk describe-environments --environment-names vls-prod-env
```

## Deploy Application To Environment

First create an application version using latest commit from CodeCommit, SourceLocation being reponame/commit-id, eg: SourceLocation=CICD/ad5810dd453af58c4be659d22e8b80eb9f84f7ed

```
aws elasticbeanstalk create-application-version \
--application-name VLS \
--version-label v1 --process \
--source-build-information SourceType=Git,SourceRepository=CodeCommit,SourceLocation=[reponame/commit-id]
```

Example:

```
aws elasticbeanstalk create-application-version \
--application-name VLS \
--version-label v1 --process \
--source-build-information SourceType=Git,SourceRepository=CodeCommit,SourceLocation=CICD/ad5810dd453af58c4be659d22e8b80eb9f84f7ed
```

Deploy lastest update 

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name [your-prod-env-name] --version-label v1
```

Example:

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name vls-prod-env --version-label v1
```

Retrieve evironment DNS and check application on the browser

```
aws elasticbeanstalk describe-environments --environment-names [your-prod-env-name] --query "Environments[*].CNAME" --output text
```

## Create QA Environment

(Note to team: no single command to clone an environmment using CLI)

Create a QA environment from a configuration template of the Prod environment.

Retrieve environment ID of Prod environment 

```
aws elasticbeanstalk describe-environments --environment-names [your-prod-env-name] --query "Environments[*].EnvironmentId" --output text
```

Example:
```
aws elasticbeanstalk describe-environments --environment-names vls-prod-env --query "Environments[*].EnvironmentId" --output text

e-smayjiqaje
```

Create a configuration template from Prod envionment using environment ID from previous step

```
aws elasticbeanstalk create-configuration-template --application-name VLS --template-name vls-app-v1 --environment-id [environment-id]
```

Check DNS availability for Prod environment

```
aws elasticbeanstalk check-dns-availability --cname-prefix [your-preferred-cname]
```

Example:
```
aws elasticbeanstalk check-dns-availability --cname-prefix vls-qa
{
    "Available": true, 
    "FullyQualifiedCNAME": "vls-prod.us-east-1.elasticbeanstalk.com"
}
```

Create QA environment using available DNS name from previous step and using configuration template create earlier

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name [your-qa-env-name] \
--cname-prefix [your-preferred-cname] \
--template-name vls-app-v1
```

Example:

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name vls-qa-env \
--cname-prefix vls-prod \
--template-name vls-app-v1
```

## Deploy Application version 2 to QA environment

First create an application version 2 using latest commit from CodeCommit, SourceLocation being reponame/commit-id, eg: SourceLocation=CICD/ad5810dd453af58c4be659d22e8b80eb9f84f7ed

```
aws elasticbeanstalk create-application-version \
--application-name VLS \
--version-label v2 --process \
--source-build-information SourceType=Git,SourceRepository=CodeCommit,SourceLocation=[reponame/commit-id]
```

Example:

```
aws elasticbeanstalk create-application-version \
--application-name VLS \
--version-label v2 --process \
--source-build-information SourceType=Git,SourceRepository=CodeCommit,SourceLocation=CICD/ad5810dd453af58c4be659d22e8b80eb9f84f7ed
```

Deploy lastest update 

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name [your-qa-env-name] --version-label v2
```

Example:

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name vls-qa-env --version-label v2
```

Retrieve evironment DNS and check application on the browser

```
aws elasticbeanstalk describe-environments --environment-names [your-qa-env-name] --query "Environments[*].CNAME" --output text
```

## Swap Environments Prod to QA to make v2 the active deployment

```
aws elasticbeanstalk swap-environment-cnames --source-environment-name [your-prod-env-name] --destination-environment-name [your-qa-env-name]
```
