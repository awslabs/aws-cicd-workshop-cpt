const express = require('express')
const bodyParser = require('body-parser')
const blog = require('./routes/blog')
const PORT = 3000

// Create the express app instance
const app = express()

// Pass the JSON serializer and blogs routes to app
app.use(bodyParser.json())
app.use('/blogs', blog)

// Let the express server listen on the defined PORT
app.listen(PORT, `Listening on port: ${PORT}`)