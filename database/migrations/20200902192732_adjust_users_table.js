exports.up = function(knex) {
  return knex.schema.table("users", users => {
    users.string("discord_access_token", 128).unique();
    users.string("discord_refresh_token", 128).unique();
    users.string("discord_token_type", 128).unique();
    users.string("discord_username", 128).unique();
  });
};

exports.down = function(knex) {
  return knex.schema.table("users", users => {
    users.dropColumns(
      "discord_access_token",
      "discord_refresh_token",
      "discord_token_type",
      "discord_username"
    );
  });
};
