const { Movie, Validate, Genre } = require('../models/movies');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    
    const movie = await Movie.find().sort('title');
    res.send(movie);
    
})

router.post('/', async (req, res) => {

    const { error } = Validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre.');
    
    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);
});

router.get('/:id', async (req, res) => {

    const movie = await Movie.findById(req.params.id);
    
    if (!movie) return res.status(404).send(`Movie with ID ${req.params.id} was not found`);
    res.send(movie);
})

router.put('/:id', async (req, res) => {

    const { error } = Validate(req.body);
    if(error)return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre.');
    
    const movie = await Movie.findOneAndUpdate(req.params.id, 
        {
            $set: {
                title: req.body.title,
                genre: {
                    _id: genre._id,
                    name: genre.name
                },
                numberInStock: req.body.numberInStock,
                dailyRentalRate: req.body.dailyRentalRate
            } 
        }, 
        { new: true }
    );
    
    if (!movie) return res.status(404).send(`Movie with ID ${req.params.id} was not found`);

    res.send(movie);

})

router.delete('/:id', async (req, res) => {
    const movie = await Movie.findByIdAndRemove(req.params.id);
    
    if (!movie) return res.status(404).send(`Movie with ID ${req.params.id} was not found`);

    res.send(movie);

})

module.exports = router;