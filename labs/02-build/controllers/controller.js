const AWS = require('aws-sdk');
AWS.config.loadFromPath('/Users/pedreviljoen/Documents/Work/AWS/ci_cd_workshop/labs/02-build/config/config.json')

// Instantiate dynamoDB instance - https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html
const dynamoDB = new AWS.DynamoDB();

exports.create = async (req, res) => {
    // Extract req paramaters
    const {
        album,
        artist,
        sales,
        songs
    } = req.body

    // Build body for input operation
    const params = {
        Item: {
            "Album": {
                S: album
            },
            "Artist": {
                S: artist
            },
            "Sales": {
                N: sales
            },
            "Songs": {
                N: songs
            }
        },
        ReturnConsumedCapacity: "TOTAL",
        TableName: "blogs"
    }

    // Call putItem method for DynamoDB SDK
    const requestPromise = new Promise(async (resolve, reject) => {
        dynamoDB.putItem(params, (err, data) => {
            if (err) {
                reject(err.stack)
            }

            resolve(data)
        });
    })

    
    try {
        const request = await requestPromise

        console.log('Response: ', request)

        //
    } catch (error) {
        console.log('Error: ', error)
        res.status(400).send({
            error: error
        })
    }
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
