
exports.up = function(knex, Promise) {
    return knex.schema.createTable('games', tbl => {
        tbl
        .increments()
        tbl
        .string('Title',128).notNullable();
        tbl
        .string('Genre',128).notNullable()
        tbl
        .integer('ReleaseYear')
    });
  
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('games');
};
