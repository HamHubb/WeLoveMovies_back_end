exports.up = function(knex) {
    return knex.schema.createTable('critics', (c)=>{
      c.increments('critic_id').primary();
      c.string('preferred_name').notNullable();
      c.string('surname');
      c.string('organization_name');
      c.timestamps(true, true);
    })
  };
  
  exports.down = function(knex) {
      return knex.schema.dropTableIfExists('critics');
  };