# Lab 1 - CodeCommit

This lab will provide an introduction into using CodeCommit for version control. In this lab we will cover:

- Creating and using a repository
- Start and manage a new branch
- Push files to CodeCommit as commits
- Open and merge a pull request [On hold for now..]

## Creating a CodeCommit repository

To create a new CodeCommit repository using the [AWS CLI](https://aws.amazon.com/cli/), run the following command from a terminal window on your cloud9 insatance:

```
aws codecommit create-repository --repository-name CICD --repository-description "My repository for the CI/CD Workshop"

```

After running this command, a json object containing Metadata is returned. Here is an example of this object:

```
{
    "repositoryMetadata": {
        "accountId": "111111111111",
        "repositoryId": "6d17a8c7-d64f-43c7-b5ba-0c3ecea54a95",
        "repositoryName": "CICD",
        "repositoryDescription": "My repository for the CI/CD Workshop",
        "lastModifiedDate": 1603917692.782,
        "creationDate": 1603917692.782,
        "cloneUrlHttp": "https://git-codecommit.eu-west-1.amazonaws.com/v1/repos/CICD",
        "cloneUrlSsh": "ssh://git-codecommit.eu-west-1.amazonaws.com/v1/repos/CICD",
        "Arn": "arn:aws:codecommit:eu-west-1:111111111111:CICD"
    }
}
```

For this lab, we will need the value of the cloneUrlHttp for cloning the repo. More details on the metadata and the Create Repository command can be [here](https://docs.aws.amazon.com/cli/latest/reference/codecommit/create-repository.html)


## Cloning a CodeCommit repository.

We are going to clone the repository created in the previous section using the [git clone command](https://www.git-scm.com/docs/git-clone):


```
git clone [cloneUrlHttp] repository
```

replacing [cloneUrlHttp] with the value returned when the repostory was created. 

Note: After cloning the repository, a warning "You appear to have cloned an empty repository." will be returned.


## Add files to the CodeCommit repository


### Configuring your git user name and email on the cloud 9 instance. 

While this is not necessary, use the following commands to set your git username and email address. These willbe the details used for commits:

```
git config --global user.name "My Username"
git config --global user.email myemail@example.com
```


We are going to clone a sample application from another repository to use for our CodeCommit repository. 


1. Navigate to the repository folder, 

```
cd repository
```

2. Clone the sample application into the folder  {tbc}

```
git clone --mirror https://github.com/pedreviljoen/aws-vls-cpt-ci_cd_workshop.git .
```

3. Push files to CodeCommit repsitory.


```
git add .
git commit -m "initial"
git push origin master

```

Here are links that proide more detials on the [git add](https://git-scm.com/docs/git-add), [git commit](https://git-scm.com/docs/git-commit) and [git push](https://git-scm.com/docs/git-push) commands. 

## Creating a new branch

To create a new branch for development, use the [git checkout command](https://git-scm.com/docs/git-checkout):

```
git checkout -b dev
git push origin dev
```


## View the Repository using the AWS Console

to view this newly created repo in the AWS console, [use this link](https://eu-west-1.console.aws.amazon.com/codesuite/codecommit/repositories/CICD/browse?region=eu-west-1)

> Todo

- [] modify this for sample repo.
- [] check to see if we should add the detials for creating a PR.
