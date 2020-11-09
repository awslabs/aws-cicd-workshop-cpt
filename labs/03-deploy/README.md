# Lab 3

## Creating and deploying a Node express server

# Lab - Elastic Beanstalk

We will create Elastic Beanstalk environment to manage the infrastructure consisting of:

- One Beanstalk Application
- Two Beanstalk environments (Blue and Green) inside the Beanstalk Application
- Switch between the two environments
For this lab, you will need to be in the ~/environment/aws-vls-cpt-ci_cd_workshop/labs/03 directory in Cloud9:

## Create instance profile role

Create role that will be used by instances launched in your Elastic Beanstalk environment

```
aws iam create-role --role-name aws-elasticbeanstalk-ec2-role --assume-role-policy-document file://trust-policy.json
```

### Attach IAM Policy to Role

Attach the managed IAM Policy `AWSElasticBeanstalkFullAccess` to the `aws-elasticbeanstalk-ec2-role` we created earlier.

```
aws iam attach-role-policy --policy-arn arn:aws:iam::aws:policy/AWSElasticBeanstalkFullAccess --role-name aws-elasticbeanstalk-ec2-role
```

## Create Beanstalk Apllication

Create Beanstalk Application that will house the two environments

```
aws elasticbeanstalk create-application --application-name VLS --description "vls application"
```

## Create Beanstalk Environment 

Check DNS availability for Blue environment

```
aws elasticbeanstalk check-dns-availability --cname-prefix [your-chosen-cname]
```

Create QA environment using DNS name from previous step

```
aws elasticbeanstalk create-environment --application-name VLS --environment-name [your-chosen-env-name] --cname-prefix [your-chosen-cname] --solution-stack-name "64bit Amazon Linux 2 v5.2.2 running Node.js 12" --option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

Check DNS availability for Green environment

```
aws elasticbeanstalk check-dns-availability --cname-prefix [your-chosen-cname]
```

Create Prod environment using DNS name from previous step

```
aws elasticbeanstalk create-environment --application-name VLS --environment-name [your-chosen-env-name] --cname-prefix [your-chosen-cname] --solution-stack-name "64bit Amazon Linux 2 v5.2.2 running Node.js 12" --option-settings Namespace=aws:autoscaling:launchconfiguration,OptionName=IamInstanceProfile,Value="aws-elasticbeanstalk-ec2-role"
```

## Deploy application to Environment

First create application version using latest commit from CodeCommit, SourceLocation being reponame/commit-id

```
aws elasticbeanstalk create-application-version --application-name VLS --version-label v1 --process --source-build-information SourceType=Git,SourceRepository=CodeCommit,SourceLocation=CICD/ad5810dd453af58c4be659d22e8b80eb9f84f7ed
```

Deploy lastest update 

```
aws elasticbeanstalk update-environment --application-name VLS --environment-name [your-chosen-env-name] --version-label v1
```
