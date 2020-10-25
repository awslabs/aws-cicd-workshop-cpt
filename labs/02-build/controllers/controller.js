const AWS = require('aws-sdk');
const globalConf = require('../config/global')

// Instantiate dynamoDB instance - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const dynamoDB = new AWS.DynamoDB();
AWS.config.update(globalConf.aws_credentials);

exports.create = (req, res) => {
    // TODO: use dynamoDB instance method putItem
}

exports.findOne = (req, res) => {
    // TODO: dynamoDB instance method getItem
}

exports.findAll = (req, res) => {
    // TODO: use dynamoDB instance method batchGetItem
}

exports.deleteOne = (req, res) => {
    // TODO: use dynamoDB instance method deleteItem
}

exports.updateOne = (req, res) => {
    // TODO: use dynamoDB instance method updateItem
}
