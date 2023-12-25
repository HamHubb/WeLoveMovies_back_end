exports.up = function(knex) {
  return knex.schema.createTable('reviews', r => {
    r.increments('review_id').primary();
    r.text('content');
    r.integer('score');
    r.integer('critic_id').unsigned();
    r.foreign('critic_id').references('critic_id').inTable('critics').onDelete('cascade');
    r.integer('movie_id').unsigned();
    r.foreign('movie_id').references('movie_id').inTable('movies').onDelete('cascade');
    r.timestamps(true, true);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable('reviews');
};
