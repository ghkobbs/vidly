const Joi = require('joi');
const mongoose = require('mongoose');


const genreSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
})

const Genre = mongoose.model('Genre', genreSchema);
/* 
const genres = [
    {id: 1, name: 'Action'},
    {id: 2, name: 'Adventure'},
    {id: 3, name: 'Comedy'},
    {id: 4, name: 'Romance'},
    {id: 5, name: 'Drama'},
];
 */

 function validateGenre(genre) {
     const schema = {
         name: Joi.string().min(3).required()
     }

     return Joi.validate(genre, schema);
 }

 module.exports.Genre = Genre;
 module.exports.Validate = validateGenre;
 module.exports.genreSchema = genreSchema;