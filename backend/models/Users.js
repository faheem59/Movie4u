const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const serverConfig = require("../config/server-config");
const secret = serverConfig.JWT_SECRET
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        type: [mongoose.Schema.Types.Mixed],
        default: [], 
    },
    
   

});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getJwtToken = function () {
    const token = jwt.sign({ _id: this._id }, secret, {
        algorithm: 'HS256',
        expiresIn: '2h'
    });
    return token;
}
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
   
};


const User = mongoose.model("User", userSchema);

module.exports = User;

