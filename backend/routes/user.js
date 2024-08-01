const express = require('express');
const { register, login, getDetails, getuserDetails, logout } = require('../controllers/Users');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/alluser', getDetails);
router.get('/profile/:id', getuserDetails);
router.get('/logout', logout);

module.exports = router;