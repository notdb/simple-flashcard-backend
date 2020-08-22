const bcrypt = require("bcryptjs");

exports.seed = function(knex, Promise) {
  return knex("users").insert([
    { username: "admin", password: bcrypt.hashSync("abc123", 8), admin: 1 },
    { username: "sammyboy", password: bcrypt.hashSync("abc123", 8), admin: 0 }
  ]);
};
