const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      username: "admin",
      password: bcrypt.hashSync("abc123", 8),
      admin: 1,
      discord_access_token: "3ZwK9x4R6L571KhJxcXC2i3AYbMyhi",
      discord_refresh_token: "ncWdxqDvFBHYTRs1V88sT4CAZVTE42",
      discord_token_type: "Bearer",
      discord_username: "dtg#8612"
    },
    { username: "sammyboy", password: bcrypt.hashSync("abc123", 8), admin: 0 }
  ]);
};
