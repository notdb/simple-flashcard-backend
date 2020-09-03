const db = require("../../database/dbConfig.js");

module.exports = {
  findBy,
  testLike
};

function findBy(filter) {
  return db("flashcards").where(filter);
}

function testLike(name) {
  return db()
    .select("sess")
    .from("sessions")
    .where("sess", "like", `%${name}%`);
}
