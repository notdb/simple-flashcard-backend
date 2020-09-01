const db = require("../../database/dbConfig.js");

module.exports = {
  findBy
};

function findBy(filter) {
  return db("flashcards").where(filter);
}
