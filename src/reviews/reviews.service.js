const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addingCritic = mapProperties({
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
})

function list() {
    return knex("reviews").select("*");
}

function read(review_id){
    return knex('reviews')
        .join('critics', 'reviews.critic_id', 'critics.critic_id')
        .select('reviews.*', 'critics.*')
        .where({ 'reviews.review_id': review_id })
        .first()
        .then(addingCritic);
}

function update(updatedReview) {
    return knex('reviews')
        .select('reviews.*')
        .where({ 'reviews.review_id': updatedReview.review_id })
        .update(updatedReview, '*')
        .then((updated) => updated[0])
}

function destroy(review_id){
    return knex('reviews')
        .where({ review_id })
        .del();
}

module.exports = {
    list,
    read,
    update,
    destroy,
}