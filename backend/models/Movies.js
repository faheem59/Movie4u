const mongoose = require('mongoose');


const movieSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    Year: { type: String, required: true },
    Rated: { type: String },
    Released: { type: String },
    Runtime: { type: String },
    Genre: { type: String },
    Director: { type: String },
    Writer: { type: String },
    Actors: { type: String },
    Plot: { type: String },
    Language: { type: String },
    Country: { type: String },
    Awards: { type: String },
    Poster: { type: String },
    Ratings: {
        metascore: { type: String },
        imdbRating: { type: String },
        imdbVotes: { type: String }
    },
    imdbRating: { type: String },
    imdbID: { type: String, unique: true, required: true },
    Type: { type: String },
    Dvd: { type: String },
    boxOffice: { type: String },
    production: { type: String },
    website: { type: String },
    response: { type: String }
}, { timestamps: true }); 

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie
