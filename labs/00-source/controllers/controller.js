const AWS = require('aws-sdk');
const dotenv = require('dotenv')
const PROD = process.env.ENV === 'prod'

if (!PROD) {
    dotenv.config()
}

// Instantiate AWS SDK with credentials
AWS.config.update({
    accessKeyId: process.env.aws_access_key,
    secretAccessKey: process.env.aws_secret_key,
    region: process.env.region,
    endpoint: process.env.service_endpoint
});


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
        TableName: "artistTable"
    }

    // Call putItem method for DynamoDB SDK
    const requestPromise = new Promise((resolve, reject) => {
        docClient.put(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully added record to table",
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

exports.deleteOne = async (req, res) => {
    // TODO: use dynamoDB instance method deleteItem
    const {
        album,
        artist
    } = req.params
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "myTableName",
        Key: {
            "Artist": artist,
            "Album": album
        },
    }

    const requestPromise = new Promise((resolve, reject) => {
        docClient.delete(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully deleted the record in the table",
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

exports.updateOne = async (req, res) => {
    // TODO: use dynamoDB instance method updateItem
    const {
        sales,
        songs
    } = req.body

    const {
        album,
        artist
    } = req.params
    const docClient = new AWS.DynamoDB.DocumentClient();

    const params = {
        TableName: "myTableName",
        Key: {
            "Artist": artist,
            "Album": album
        },
        UpdateExpression: "set Sales = :sales, Songs = :songs",
        ExpressionAttributeValues: {
            ":sales": sales,
            ":songs": songs
        },
        ReturnValues: "UPDATED_NEW"
    }

    const requestPromise = new Promise((resolve, reject) => {
        docClient.update(params, (err, data) => {
            if (err) {
                reject(JSON.stringify(err, null, 2))
            }

            resolve({
                message: "Successfully updated the record in the table",
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
