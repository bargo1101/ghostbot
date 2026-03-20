'use strict';

const rateLimit = require('express-rate-limit');

// Rate limit configuration
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
});

const loginLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 10, // Limit each IP to 10 requests per windowMs for login
    message: 'Too many login requests from this IP, please try again later.',
});

const endpointCategories = [
    { path: '/api/general', limiter: generalLimiter },
    { path: '/api/login', limiter: loginLimiter },
];

// Apply rate limits to endpoint categories
endpointCategories.forEach(category => {
    app.use(category.path, category.limiter);
});

module.exports = endpointCategories;
