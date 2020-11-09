const express = require('express')
const bodyParser = require('body-parser')
const music = require('./routes/music')
const PORT = process.env.PORT || 3000

// Create the express app instance
const app = express()

// Pass the JSON serializer and blogs routes to app
app.use(bodyParser.json())
app.use('/api/v1/music', music)

// Health checker for ELB health checks
app.get('/health', (req, res) => {
    res.status(200).send('I am healthy')
})

// Let the express server listen on the defined PORT
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))