const db = require("../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  isLoggedIn,
  addLoggedIn,
  findByIdLoggedIn
};

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user);

  return findById(id);
}

function isLoggedIn(filter) {
  return db("loggedin").where(filter);
}

async function addLoggedIn(user) {
  const [id] = await db("loggedin").insert(user);
  return findByIdLoggedIn(id);
}

function findByIdLoggedIn(id) {
  return db("loggedin")
    .where({ id })
    .first();
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
