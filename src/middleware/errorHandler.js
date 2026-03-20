'use strict';

const { createLogger, format, transports } = require('winston');

// Set up logging
const logger = createLogger({
    level: 'error',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log' }),
    ],
});

const errorHandler = (err, req, res, next) => {
    // Log the error
    logger.error({ message: err.message, stack: err.stack });

    // Respond with a user-friendly message
    res.status(500).json({ message: 'Something went wrong!' });
};

module.exports = errorHandler;
