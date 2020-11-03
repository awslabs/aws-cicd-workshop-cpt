const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')

router.use((req, res, next) => {
    // Some logging about the request
    console.log('[INFO] Request time: ', new Date(Date.now()))
    console.log('[INFO] Request path: ', req.path)

    next();
})

// CRUD API operations
// Create
router.post('/', controller.create)

// Read
router.get('/:artist/:album', controller.findOne)
router.get('/', controller.findAll)

// Update
router.put('/:id', controller.updateOne)

// Delete
router.delete('/:id', controller.deleteOne)

module.exports = router