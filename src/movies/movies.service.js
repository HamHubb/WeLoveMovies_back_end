const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

async function list() {
    return knex("movies").select("*");
}

async function listCurrentlyShowing() {
    return knex('movies')
        .join('movies_theaters', 'movies.movie_id', 'movies_theaters.movie_id')
        .where({ 'movies_theaters.is_showing': true})
        .distinct('movies.movie_id')
        .select('movies.*');
}
async function read(movieId) {
    return knex('movies')
        .select('*')
        .where('movie_id', movieId)
        .first();
 }

async function readTheatersByMovieId(movieId) {
    return knex("theaters as t")
    .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
    .select("t.*", "mt.*")
    .where({ "mt.movie_id": movieId })
    .orderBy("t.theater_id");
}

const reduceCritics = reduceProperties("review_id", {
    critic_id: ['critic', 'critic_id'],
    preferred_name: ['critic', 'preferred_name'],
    surname: ['critic', 'surname'],
    organization_name: ['critic', 'organization_name'],
  });

async function readReviewsByMovieId(movieId){
    return knex('reviews')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('reviews.*', 'critics.*')
        .where({ 'reviews.movie_id': movieId })
        .then(reduceCritics);
}


module.exports = {
    list,
    listCurrentlyShowing,
    read,
    readTheatersByMovieId,
    readReviewsByMovieId,
}