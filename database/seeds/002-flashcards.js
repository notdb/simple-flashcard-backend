exports.seed = function(knex, Promise) {
  return knex("flashcards").insert([
    { front: "ans is a", back: "a", owner: "admin" },
    { front: "ans is b", back: "b", owner: "admin" },
    { front: "ans is c", back: "c", owner: "admin" },
    { front: "ans is d", back: "d", owner: "admin" },
    { front: "ans is e", back: "e", owner: "admin" },
    { front: "ans is f", back: "f", owner: "admin" },
    { front: "ans is g", back: "g", owner: "admin" }
  ]);
};
