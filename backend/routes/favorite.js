const express = require("express");
const { isAuthenticated } = require("../middleware/auth");
const { addFavorite, removeFavorite,  getAllMovies, getAllFavorites } = require("../controllers/Favorite");
const router = express.Router();

router.post('/favorites/add', isAuthenticated, addFavorite);
router.delete('/favorites/remove', isAuthenticated, removeFavorite);
router.get('/favorites', isAuthenticated, getAllFavorites);
router.get('/movie', getAllMovies);

module.exports = router;