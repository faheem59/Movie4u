const jwt = require('jsonwebtoken');
const catchAsyncError = require('./catchAsyncError');
const User = require('../models/Users');
const secret = 'Raj123';

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
    // console.log('Request Headers:', req.headers);
    // console.log("Cookies:", req.cookies);

    const token = req.cookies.token || (req.header("Authorization") && req.header("Authorization").replace("Bearer ", ""));
    // console.log("Token:", token);

    if (!token) {
        return res.status(401).json({ message: "Not Authenticated" });
    }

    try {
        
        const decodedToken = jwt.verify(token, secret, { algorithms: ['HS256'] });
        // console.log("Decoded Token:", decodedToken);

        
        const user = await User.findById(decodedToken._id);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication Error:", error.message, error.stack);
        return res.status(401).json({ message: "Authentication failed" });
    }
});
