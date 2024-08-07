const Movie = require("../models/Movies");
const User = require("../models/Users");
const message = require("../utils/message");
const { getCache, setCache } = require("../utils/redis");
const respondWithStatus = require("../utils/responseStatus");

exports.addFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const userId = req.user.id;

        const movie = await Movie.findOne({ imdbID: imdbID });

        if (!movie) {
            return respondWithStatus(res, 404, message.error.movieNotFound);
        }

        // const movieId = movie._id;
        const user = await User.findById(userId);
        if (!user) {
            return respondWithStatus(res, 404, message.error.userNotFound);
        }

        if (user.favorites.some(favorite => favorite.imdbID === imdbID)) {
            return respondWithStatus(res, 400, message.error.movieFavExits);
        }

        const movies = {
            Title: movie.Title,
            Poster: movie.Poster,
            Year: movie.Year,
            imdbRating: movie.imdbRating,
            Genre: movie.Genre,
            imdbID: movie.imdbID
        };

        user.favorites.push(movies);
        await user.save();

        respondWithStatus(res, 200, message.success.movieCreated, { user });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.removeFavorite = async (req, res) => {
    try {
        const { imdbID } = req.query;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) {
            return respondWithStatus(res, 404, message.error.userNotFound);
        }

        user.favorites = user.favorites.filter(favorite => favorite.imdbID !== imdbID);
        await user.save();

        respondWithStatus(res, 200, message.success.movieRemove);
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};

exports.getAllFavorites = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return respondWithStatus(res, 401, message.error.unauthorizedUser);
        }

        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user) {
            return respondWithStatus(res, 404, message.error.userNotFound);
        }

        const favoriteMovies = user.favorites;

        if (!favoriteMovies || favoriteMovies.length === 0) {
            return respondWithStatus(res, 200, message.error.movieNotFound, { favorites: [] });
        }

        const movieDetails = favoriteMovies.map(async (fav) => {
            return Movie.findOne({ imdbID: fav.imdbID });
        });

        const resolvedMovies = await Promise.all(movieDetails);

        respondWithStatus(res, 200, message.success.fetchFavMovie, { favorites: resolvedMovies });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};
exports.getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        respondWithStatus(res, 200, { message: message.success.fetchFavMovie }, { movies });
    } catch (error) {
        respondWithStatus(res, 500, message.error.internalError);
    }
};
