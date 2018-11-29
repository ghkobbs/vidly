const Joi = require('joi');
const mongoose = require('mongoose');
const { genreSchema, Genre } = require('./genres');

const movieSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true, 
        maxlength: 255 
    },
    genre: { 
        type: genreSchema, 
        required: true 
    },
    numberInStock: { 
        type: Number, 
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
        max: 255,
        $get: v => Math.round(v),
        $set: v => Math.round(v)
    }
})

const Movie = mongoose.model('Movie', movieSchema);

function validateMovie(movie) {
    const schema = {
        title: Joi.string().min(1).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().required(),
        dailyRentalRate: Joi.number().required()
    }

    return Joi.validate(movie, schema);
}

module.exports.Movie = Movie;
module.exports.Validate = validateMovie;
//module.exports.genreSchema = genreSchema;
module.exports.Genre = Genre;