const express = require('express')
const router = express.Router()
const controller = require('../controllers/controller')
const debug = require('debug')('http')
const winston = require('winston')
const PROD = process.env.ENV === 'prod'

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { service: 'artist-service' },
    transports: [
      //
      // - Write to all logs with level `info` and below to `quick-start-combined.log`.
      // - Write all logs error (and below) to `quick-start-error.log`.
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' })
    ]
});

if (!PROD) {
    logger.add(new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }));
}

router.use((req, res, next) => {
    // Debug logger
    debug('Request time: ', new Date(Date.now()))
    debug('Request path: ', req.path)

    // Logging some information about request using winston
    if (!PROD) {
        logger.info('Request time: ', new Date(Date.now()))
        logger.info('Request path: ', req.path)
    } else {
        logger.log('Request time: ', new Date(Date.now()))
        logger.log('Request path: ', req.path)
    }
    next();
})

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

module.exports = router