const express = require('express');
const app = express();
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/vidly',{ useNewUrlParser: true })
    .then(() => console.log('Mongoose Connected'))
    .catch(err => console.error('Could not connect to database', err));

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);
app.use('/api/movies', movies);
app.use('/', home);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on post ${port}...`);
})