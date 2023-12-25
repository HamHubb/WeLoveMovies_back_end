const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require('./movies.service')

// const validateData = (req, res, next) => {
//     if(req.body.data) {
//         return next()
//     }
//     next({
//         status: 400,
//         message: "body missing data property"
//     })
// }

async function movieExists(req, res, next) {
    const { movieId } = req.params;

    try {
        const movie = await service.read(movieId);

        if (movie) {
            res.locals.movie = movie;
            return next();
        }

        next({
            status: 404,
            message: `Movie id not found: ${movieId}`,
        });
    } catch (error) {
        next(error);
    }
}

async function list(req, res) {
    const { is_showing } = req.query;

    if (is_showing === 'true') {
        const data = await service.listCurrentlyShowing();
        res.json({ data });
    } 
    const data = await service.list();
    res.json({ data });
    
}

async function readTheatersByMovieId(req, res) {
    const { movieId } = req.params;
    const data = await service.readTheatersByMovieId(movieId);
    res.json({ data });
}

async function readReviewsByMovieId(req, res) {
    const reviews = await service.readReviewsByMovieId(
        res.locals.movie.movie_id
    )
    res.json({ data: reviews })
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [movieExists, asyncErrorBoundary(read)],
    readTheatersByMovieId: [movieExists, asyncErrorBoundary(readTheatersByMovieId)],
    readReviewsByMovieId: [movieExists, asyncErrorBoundary(readReviewsByMovieId)]

}