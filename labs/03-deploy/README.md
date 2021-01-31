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

Create an Elastic Beanstalk Application that will house the two environments - QA and Prod

```
aws elasticbeanstalk create-application --application-name VLS --description "vls application"
```

Check that the application has been successfully created

```
aws elasticbeanstalk describe-applications
```

## Create Elastic Beanstalk Environment For QA 

Check DNS availability for QA environment

```
aws elasticbeanstalk check-dns-availability --cname-prefix [your-preferred-cname]
```

Example:
```
aws elasticbeanstalk check-dns-availability --cname-prefix vls-qa
{
    "Available": true, 
    "FullyQualifiedCNAME": "vls-qa.us-east-1.elasticbeanstalk.com"
}
```

Create QA environment using available DNS name from previous step

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name [your-env-name] \
--cname-prefix [your-preferred-cname] \
--solution-stack-name "64bit Amazon Linux 2 v5.2.4 running Node.js 12" \
--option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

Example:

```
aws elasticbeanstalk create-environment \
--application-name VLS \
--environment-name vls-qa-env \
--cname-prefix vls-qa \
--solution-stack-name "64bit Amazon Linux 2 v5.2.4 running Node.js 12" \
--option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

Allow approximatley 5 minutes for the environment to create and thereafter check that it has created successfully:

```
aws elasticbeanstalk describe-environments --environment-names [your-env-name] 
```

Example:
```
aws elasticbeanstalk describe-environments --environment-names vls-qa-env
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
aws elasticbeanstalk update-environment --application-name VLS --environment-name [your-env-name] --version-label v1
```

Example:

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name vls-qa-env --version-label v1
```

Retrive environment DNS and check application on the browser

```
aws elasticbeanstalk describe-environments --environment-names [your-env-name] --query "Environments[*].CNAME" --output text
```

## Create Prod Environment
