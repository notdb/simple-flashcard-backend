exports.up = function(knex) {
  return knex.schema.createTable("flashcards", flashcards => {
    flashcards.increments();
    flashcards.string("front", 128).notNullable();
    flashcards.string("back", 128).notNullable();
    flashcards
      .string("owner", 128)
      .references("username")
      .inTable("users")
      .notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("flashcards");
};
