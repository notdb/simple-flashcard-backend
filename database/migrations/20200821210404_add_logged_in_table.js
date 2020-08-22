exports.up = function(knex) {
  return knex.schema.createTable("loggedin", loggedin => {
    loggedin.increments();

    loggedin.string("username", 128).notNullable();
    loggedin
      .string("auth_user", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("loggedin");
};
