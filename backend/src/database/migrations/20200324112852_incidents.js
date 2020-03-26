
exports.up = function(knex) {
  return knex.schema.createTable('Incidents',function (table){
    table.increments();
    table.string('title').notNullable();
    table.string('descriptions').notNullable();
    table.decimal('value').notNullable();
    table.string('NGO_id').notNullable();
    table.foreign('NGO_id').references('id').inTable('NGO');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Incidents');
};
