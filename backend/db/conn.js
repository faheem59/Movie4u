const mongoose = require('mongoose');
const serverConfig = require('../config/server-config');


const connectToDB = async () => {
    try {
        await mongoose.connect(serverConfig.MONGO_URI, {
        });
        console.log('Connected to MongoDB');
        return mongoose;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
};

module.exports = connectToDB;
