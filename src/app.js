if (process.env.USER) require("dotenv").config();
const cors = require('cors');
const express = require("express");

const errorHandler = require('./errors/errorHandler');
const notFound = require('./errors/notFound');
const moviesRouter = require('./movies/movies.router')
const reviewsRouter = require('./reviews/reviews.router')
const theaterRouter = require('./theaters/theaters.router');

const app = express();

app.use(cors())
app.use(express.json())

app.use('/movies', moviesRouter);
app.use('/reviews', reviewsRouter);
app.use('/theaters', theaterRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;