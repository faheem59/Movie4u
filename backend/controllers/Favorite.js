const Movie = require("../models/Movies");
const User = require("../models/Users");
const axios = require('axios')



exports.addFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query
        const userId = req.user.id;  
        
    
        const movie = await Movie.findOne({ imdbID: imdbID }); 
      
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        const movieId = movie._id; 
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.favorites.includes(movieId)) {
            return res.status(400).json({ message: "Movie is already in favorites" });
        }
        const movies = {
            Title: movie.Title,
            Poster: movie.Poster,
            Year: movie.Year,
            imdbRating: movie.imdbRating,
            Genre: movie.Genre,
            imdbID:movie.imdbID
        }
        user.favorites.push(movies);
        await user.save();

        res.status(200).json({ success: true, message: "Movie added to favorites", user });
    } catch (error) {
        console.error("Error adding favorite:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query
        const userId = req.user.id; 

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let favs = JSON.parse(JSON.stringify(user.favorites));
       
        user.favorites = favs.filter(favorite => favorite?.imdbID !== imdbID);
        await user.save();

        res.status(200).json({ success: true, message: "Movie removed from favorites" });
    } catch (error) {
        console.error("Error removing favorite:", error);
        res.status(500).json({ message: "Server error" });
    }
};

exports.getAllFavorites = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: "User is not authenticated" });
        }

        const userId = req.user.id;
      

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const favoriteMovies = JSON.parse(JSON.stringify(user.favorites))
      
        if (!favoriteMovies || favoriteMovies.length === 0) {
            return res.status(200).json({ message: "No favorite movies found", favorites: [] });
        }
       
        const movieDetails = favoriteMovies.map(async (fav) => {
            return await Movie.findOne({ imdbID: fav?.imdbID });
        });

        const resolvedMovies = await Promise.all(movieDetails);

        res.status(200).json({ success: true, favorites: resolvedMovies });
    } catch (error) {
        console.error("Error fetching favorite movies:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};



exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find(); 
        res.status(200).json(movies);
    } catch (error) {
        console.error("Error fetching movies:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};