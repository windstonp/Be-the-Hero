
exports.up = function(knex) {
  return knex.schema.createTable('Incidents',function (table){
    table.increments();
    table.string('title').notNullable();
    table.string('descriptions').notNullable();
    table.decimal('value').notNullable();
    table.string('NPO_id').notNullable();
    table.foreign('NPO_id').references('id').inTable('NPO');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('Incidents');
};
