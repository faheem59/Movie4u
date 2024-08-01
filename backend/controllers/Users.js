const User = require('../models/Users');
const sendToken = require('../utils/jwtToken');

exports.register = async(req,res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            res.status(400).json('email is already exists')
        }
        const newUser = new User({ name, email, password});
        const user = await newUser.save();
        sendToken(user, 201, res);
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: "Server error" }); 
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "No user found" });
        }
        
        const isMatched = await user.comparePassword(password);
        if (!isMatched) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = user.getJwtToken();
        console.log(token);
        sendToken(user, 200, res);

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getDetails = async(req,res) => {
    try {
        const allUser = await User.find();
        res.status(202).json(allUser);
    } catch (e) {
        console.log(e);
    }
} 

exports.getuserDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User Not Found" });
        }

        res.status(200).json(user);
    } catch (e) {
        console.log(e);
    }
}



exports.logout = async (req,res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
}