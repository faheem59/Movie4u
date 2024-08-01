const User = require('../models/Users');
const sendToken = require('../utils/jwtToken');
const message = require('../utils/message');
const respondWithStatus = require('../utils/responseStatus'); 
const validateUser = require('../validation/userValidation');

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const validationResult = validateUser({ name, email, password });

        if (validationResult !== true) {
            return respondWithStatus(res, 400, message.error.validationError, { details: validationResult });
        }
        const existUser = await User.findOne({ email });
        if (existUser) {
            return respondWithStatus(res, 400, message.error.userInUse);
        }

        const newUser = new User({ name, email, password });
        const user = await newUser.save();
        sendToken(user, 201, res);
    } catch (e) {
        console.log(e);
        respondWithStatus(res, 500, message.error.internalError);
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
            return respondWithStatus(res, 400, message.error.userNotFound);
        }

        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return respondWithStatus(res, 400, message.error.invalidCredentials);
        }

        sendToken(user, 200, res);
    } catch (error) {
        console.error('Login error:', error);
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.logout = async (req, res) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    respondWithStatus(res, 200, message.success.logoutSuccessful);
}
