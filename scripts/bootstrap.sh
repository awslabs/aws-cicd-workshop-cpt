#!/bin/bash
# Installing jq
sudo yum -q install jq -y

# Set region and setup CLI
REGION=$(curl --silent http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region)
aws configure set region $REGION

# Clearing Cloud9 temporary credentials
rm -vf ~/.aws/credentials

echo "AWS CLI version:"

aws --version

echo; echo "AWS identity:"

aws sts get-caller-identity | jq -r '.Arn'

echo; echo "You should expect to see the IAM Role we attached earlier, with an instance ID on the end"
echo; echo "For example: arn:aws:sts::1234567890:assumed-role/cloud9-AdminRole-1VFO62P60OPQ1/i-07dfdf99d48eb10b0"