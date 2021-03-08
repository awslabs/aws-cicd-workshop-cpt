#!/bin/bash
echo "Running GameDay Submission Script"
# Checking required Environment Variables and promting the user if the details do not exsist
if [[ -z "${NAME}" ]]; then
  echo "NAME environment variable is not set, please enter your name"
  read -p 'Username: ' canidate_name
else
  canidate_name="${NAME}"
fi
# Getting Email Address
if [[ -z "${EMAIL}" ]]; then
  echo "EMAIL environment variable is not set, please enter your email address"
  read -p 'Useremail: ' canidate_email
else
  canidate_email="${EMAIL}"
fi
echo "Thank you $canidate_name, genrating submission bundle now"
echo $canidate_email
# removing spaces, just incase
canidate_name="${canidate_name// /_}"
# Genrating file with addtional details. 
printf "Submission script for GameDay %s\n" > submission.txt
printf "Name : %s\n" "$canidate_name" >> submission.txt
printf "Email address : %s\n" "$canidate_email" >> submission.txt
# LIst all pipleines in AWS Region. 
printf "====================All pipelines========================= %s\n" >> submission.txt
for name in $(aws codepipeline list-pipelines --query 'pipelines[*].name' --output text) 
do 
  echo "Adding pipeline configuration $name %s\n" >> submission.txt 
  echo "adding pipleine $name to submission"
  aws codepipeline get-pipeline --name $name >> submission.txt 
  aws codepipeline get-pipeline-state --name $name >> submission.txt 
done
# Checking Elastic beanstalk environments
echo "Checking Elastic Beanstalk environments"
echo "Checking EB" >> submission.txt
aws elasticbeanstalk describe-environments  >> submission.txt
# Checking Codedeploy Applications
echo "Checking CodeDeploy"
echo "Checking CD" >> submission.txt
aws deploy list-applications >> submission.txt
echo "Checking CodeBuild"
for name in $(aws codebuild list-projects --query 'projects[*]' --output text) 
do
 echo "Adding codebuild configuration $name %s\n" >> submission.txt 
 echo "adding CodeBuild $name to submission"
 aws codebuild batch-get-projects --names $name >> submission.txt 
done
# Attempting to zip code and submission.txt
echo "attempting to zip submission files"
file_name=$canidate_name
file_name+=_$(date +"%s")
zip -r $file_name ./*
# Adding jq 
sudo yum install -y jq
# Attempting to upload codesubmission.txt
echo "attempting to get upload link"
file_name+=.zip
Upload_Endpoint="https://g3u57i1c49.execute-api.us-east-1.amazonaws.com/default/vls-s3-url-genarator?name=submissions/"
Upload_Endpoint+=$file_name
Upload_URL=$( curl  $Upload_Endpoint | jq --raw-output '.signed_url' )
echo "Attempting to upload $file_name "
curl -v --upload-file $file_name $Upload_URL
# Cleaning up temp zip
echo "Clearing up temp files"
rm $file_name
rm submission.txt
echo "Done, thank you very much :-)"

