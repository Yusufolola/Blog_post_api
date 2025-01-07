const HttpError = require("../models/errorModel")
const Jwt = require('jsonwebtoken');
const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]; // Get token from cookies or header
    console.log("Token:", token);

    if (!token) {
        return next(new HttpError("Unauthorized", 401));
    }

    try {
        const decoded = Jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;  
        next();
    } catch (err) {
        return next(new HttpError("Invalid token", 401));
    }
};


module.exports = authMiddleware
