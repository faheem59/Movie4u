const mongoose = require('mongoose');


const connectToDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Movie', {
        });
        console.log('Connected to MongoDB');
        return mongoose;
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error; 
    }
};

module.exports = connectToDB;
