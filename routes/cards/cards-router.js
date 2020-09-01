const router = require("express").Router();
const Cards = require("./cards-model.js");

listOfCards = [
  { id: "1", front: "test card", back: "foo" },
  { id: "2", front: "foo", back: "bar" },
  { id: "3", front: "food", back: "bart" }
];

router.get("/", async (req, res) => {
  try {
    res.status(200).json(listOfCards);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/flashcards", async (req, res) => {
  try {
    Cards.findBy({ owner: "admin" }).then(cards => {
      res.status(200).json({ cards });
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
