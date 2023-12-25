const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require('./reviews.service')

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;

    try {
        const review = await service.read(reviewId);

        if (review) {
            res.locals.review = review;
            return next();
        }

        next({
            status: 404,
            message: `cannot be found`,
        });
    } catch (error) {
        next(error);
    }
} 

async function list(req, res) {
    const data = await service.list();
    res.json({ data });
}

async function read(req, res, next) {
    const review = res.locals.review;
    res.json({ data: review })
}

async function update(req, res, next) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
    };
    await service.update(updatedReview);
    const data = await service.read(res.locals.review.review_id);
    res.json({ data });
  }

async function destroy(req, res, next){
    const { reviewId } = req.params
    try {
        await service.destroy(reviewId)
        res.status(204).send()
    } catch(err) {
        next(err)
    }
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [reviewExists, asyncErrorBoundary(read)],
    update: [reviewExists, asyncErrorBoundary(update)],
    destroy: [reviewExists, asyncErrorBoundary(destroy)]
}