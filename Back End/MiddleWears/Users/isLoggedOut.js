const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const isLoggedOut = (req, res, next) => {
    try {
        // Access token from cookies
        const token = req.cookies.access_token;
        if (token) {
            // Verify the token
            jwt.verify(token, process.env.JWT_SECRET);
            // If the token is valid, user is logged in
            return next(createError(401, 'You are already logged in'));
        }
        // If no token is present, proceed
        next();
    } catch (error) {
        // If there's an error (e.g., invalid token), just continue
        next();
    }
};

module.exports = isLoggedOut;
