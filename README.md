# AWS Engineering Learning Series - CI / CD

> A series of AWS Labs with CI/CD services

<div align="center" style="padding:20px;">
    <img src="./assets/aws_logo.png" width="50%" height="75%">
</div>

## Labs

- [Lab 1](./labs/01-repo/README.md)
- [Lab 2](./labs/02-build/README.md)
- [Lab 3](./labs/03-beanstalk/README.md)
- [Lab 4](./labs/04-pipeline/README.md)
- [Lab 5](./labs/05-infra-as-code/README.md)
- [Lab 6](./labs/06-artifacts/README.md)

## Launching your Lab Environment

### 1. Launch a Cloud9 Environment

This will be where you'll be performing the labs throughout the sessions.

Click the button to begin creating a CloudFormation stack for the region you are assigned.

Preferably right click and open it in a new tab.

| Region          | CloudFormation     |
| --------------- |:------------------:|
| eu-west-1 (Ireland)       | [![Launch Stack](https://s3.amazonaws.com/cloudformation-examples/cloudformation-launch-stack.png)](https://console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/create/review?stackName=cicd-workshop&templateURL=https://ci-cd-workshop-cloud9-template.s3-eu-west-1.amazonaws.com/c9-template.yaml) |

Just before clicking "Create stack" button, please tick "I acknowledge that AWS CloudFormation might create IAM resources."

If you get stuck, the CloudFormation template is available in this [repo](./cloudformation/c9-template.yaml).

### 2. Attach the IAM Role to the Cloud9 instance

This will allow your cloud9 environment access to perform the actions needed for the sessions.

This can be done in the EC2 console, navigate to your EC2 instances, or click the link below:

Preferably right click and open it in a new tab.

| Region          | EC2     |
| --------------- |:------------------:|
| eu-west-1 (Ireland)       | [Console link](https://eu-west-1.console.aws.amazon.com/ec2/v2/home?region=eu-west-1#Instances:tag:Name=cloud9;sort=instanceState) |

* Select the Cloud9 instance
* Click Actions > Security > Modify IAM role
* Filter the roles, searching for "cicd"
* Click Apply once the role is selected

### 3. Access your Cloud9 environment

This can be done in the Cloud9 console, navigate to Cloud9 or click the link below:

Preferably right click and open it in a new tab.

| Region          | EC2     |
| --------------- |:------------------:|
| eu-west-1 (Ireland)       | [Console link](https://eu-west-1.console.aws.amazon.com/cloud9/home?region=eu-west-1) |

* Click Open IDE

### 4. Setup the Cloud9 environment

The environment will be our workstation for the sessions, there are a few steps needed to get it setup

* From within the Cloud9 environment perform the below steps:

  * Click on AWS Cloud9 (top left) > Preferences
  * Click on AWS SETTINGS > Credentials
  * Turn off 'AWS managed temporary credentials'

* Change to a dark theme if you prefer:

  * View > Themes > UI Themes > Classic Dark

### Run the below commands in the Cloud9 terminal

#### Clone the repository

```bash
$ git clone https://github.com/pedreviljoen/aws-vls-cpt-ci_cd_workshop.git workshop
```

#### Navigate to the project directory and run the bootstrap script

The script installs and configures the necessary pre-requisites

```bash
$ cd workshop/
$ cd scripts/
$ chmod +x bootstrap.sh
$ sudo bootstrap.sh
```

Confirm the IAM role is as expected

> internal checklist

- [ ] Add detailed Labs for day 1 / 2
- [ ] Add section for day 3 challenge
