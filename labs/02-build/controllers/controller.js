const AWS = require('aws-sdk');
const globalConf = require('../config/global')
// Instantiate dynamoDB instance - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html

AWS.config.update(globalConf.config);

exports.create = async (req, res) => {
    // Extract req paramaters
    const {
        album,
        artist,
        sales,
        songs
    } = req.body

    const docClient = new AWS.DynamoDB.DocumentClient();

    // Build body for input operation
    const params = {
        Item: {
            "Album": album,
            "Artist": artist,
            "Sales": sales,
            "Songs": songs
        },
        TableName: "myTableName"
    }

    // Call putItem method for DynamoDB SDK
    const requestPromise = new Promise((resolve, reject) => {
        docClient.put(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully added record to table",
                data: data,
                success: true
            })
        });
    })

    
    try {
        const request = await requestPromise

        res.status(200).send({
            ...request           
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(400).send({
            error: JSON.parse(error),
            success: false
        })
    }
}

exports.findOne = async (req, res) => {
    // TODO: dynamoDB instance method getItem
    const {
        album,
        artist
    } = req.params
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "myTableName",
        Key: {
            "Album": album,
            "Artist": artist
        }
    }

    const requestPromise = new Promise((resolve, reject) => {
        docClient.get(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully retrieved record to table",
                data: data,
                success: true
            })
        })
    })

    //
    try {
        const request = await requestPromise

        res.status(200).send({
            ...request          
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(400).send({
            error: JSON.parse(error),
            success: false
        })
    }
}

exports.findAll = async (req, res) => {
    // TODO: use dynamoDB instance method batchGetItem
    const docClient = new AWS.DynamoDB.DocumentClient();
    const params = {
        TableName: "myTableName"
    }

    const requestPromise = new Promise((resolve, reject) => {
        docClient.scan(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully scanned the table for records",
                data: data,
                success: true
            })
        })
    })

    try {
        const request = await requestPromise

        res.status(200).send({
            ...request          
        })
    } catch (error) {
        console.log('Error: ', error)
        res.status(400).send({
            error: JSON.parse(error),
            success: false
        })
    }
}

exports.deleteOne = (req, res) => {
    // TODO: use dynamoDB instance method deleteItem
}

exports.updateOne = (req, res) => {
    // TODO: use dynamoDB instance method updateItem
}
