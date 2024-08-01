const Validator = require('fastest-validator');
const v = new Validator();

const userValidation = {
    name: {
        type: "string",
        min: 3,
        max: 30,
    },
    email: {
        type: "string",
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 
        empty: false, 
    },
    password: {
        type: "string",
        min: 8,
        pattern: "^(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$"
    }
};

const validateUser = v.compile(userValidation);

module.exports = validateUser;