# Beanstalk web server application

## Creating and runnig a Beanstalk environment

In this lab we will create the CRUP API that will be launched to our Beanstalk environment in the next lab. This CRUD API will interact with our DynamoDB table and showcase simple create, read, update and delete operations for records inside our table.

> What we will build and learn

- A simple CRUD API that interacts with our DynamoDB table
- Use and initialize the NodeJS SDK

### Install the required dependancies

The application runs a `NodeJS` express server and requires some dependancies to run. One way to install the necessary dependancies is to navigate to the route directory of the project and run the below command:

```bash
npm install
```

This command makes use of `npm` as the [package manager](https://www.npmjs.com/) and will look for any dependancies to install inside the `package.json` file. Let's have a look at that file and check out what dependancies are being used by this project. Inside the `package.json` file we will see some contents similar to:

```javascript
    {
        "dependencies": {
            "aws-sdk": "2.778.0",
            "body-parser": "1.19.0",
            "dotenv": "8.2.0",
            "express": "4.17.1"
        }
    }
```

The project makes use of 4 packages namely `aws-sdk`, `body-parser`, `dotenv` and `express`. `npm` will take care of the rest and install the above required packages for the project to use.

### Explain the application structure

The application is structured in such a way that follows the [seperate concerns](https://en.wikipedia.org/wiki/Separation_of_concerns) design pattern. This is a common standard when it comes to developing APIs, and is one implementation.

The project has the below structure:

```bash
├── README.md
├── app.js
├── controllers
│   └── controller.js
├── package-lock.json
├── package.json
├── routes
│   └── music.js
└── yarn.lock
```

The `app.js` file is the entry point of our application and is responsible to start our `Express` server. Inside our `routes` directory we have all the routes that our server will serve for incoming requests. Inside our `controllers` directory we have the business logic, this is where the magic happens and where we will be adding code to respond to incoming requests and interface with our `DynamoDB` table.

### Developing our CRUD methods

There are some common operations in modern day APIs and this project aims to illustrate those. `CRUD` which translates to any operation which aim to:

- Create
- Read
- Update
- Delete

These operations correspond to `HTTP RESTful` [standards](https://en.wikipedia.org/wiki/Representational_state_transfer). The above operations are implement with the below HTTP request types:

- POST will perform create operations
- GET will perform read operations
- PUT will perform update operations
- DELETE will perform delete operations

Inside our `routes` directory we will see the corresponding HTTP request types that are performing the respective operations.

Let's dive into our application entry point, `app.js` and talk about each section.

```javascript
const express = require('express')
const bodyParser = require('body-parser')
const music = require('./routes/music')
const PORT = process.env.PORT || 3000
// Create the express app instance
const app = express()
```

The above lines import the required dependancies and instantiates our `express` app.

```javascript
// Pass the JSON serializer and blogs routes to app
app.use(bodyParser.json())
app.use('/api/v1/music', music)

// Health checker for ELB health checks
app.get('/health', (req, res) => {
    res.status(200).send('I am healthy')
})
```

The above lines specifies a couple of things for our `express` app. The first line tells our `express` app to use the body parser to serialize the `JSON` payload of our requests and responses.

The second line tells our `express` app to for the route `api/v1/music` to use the routes we have defined inside of our `routes` directory. The last line is a simple health check where Beanstalk will send regular health checks to the `/health` route and based on the response determine the health of the environment.

```javascript
// Let the express server listen on the defined PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
```

This line tells our `express` app to listen on `PORT` for incoming requests.

Moving on to our `routes` directory, we have a file `music.js`. Inside this file we have declared all the routes that our `express` app file serve requests on. Let's dive into this file.

```javascript
const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
```

These lines do the same as `app.js`, here we import the required dependancies or additional files inside the project.

```javascript
router.use((req, res, next) => {
    // Some logging about the request
    console.log('[INFO] Request time: ', new Date(Date.now()))
    console.log('[INFO] Request path: ', req.path)

    next();
})
```

This section of code, acts as a middleware layer. All requests will pass through here, before being handled by their respective controllers. This section aims to provide some logging for the incoming requests, like the `time` and `path` of the request.

```javascript
// CRUD API operations
// Create
router.post('/', controller.create)

// Read
router.get('/:artist/:album', controller.findOne)
router.get('/', controller.findAll)

// Update
router.put('/:artist/:album', controller.updateOne)

// Delete
router.delete('/:artist/:album', controller.deleteOne)
```

The above lines of code implement our CRUD operations for specific HTTP requests and routes.

