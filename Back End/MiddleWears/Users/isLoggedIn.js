const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const isLoggedIn = (req, res, next) => {
    try {
        // Access token from cookies
        const token = req.cookies.access_token;
        if (!token) {
            return next(createError(401, "You are not authenticated. Please login first"));
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();

    } catch (error) {
        next(createError(401, "You are not authenticated. Please login first"));
    }
};

module.exports = isLoggedIn;
