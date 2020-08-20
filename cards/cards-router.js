const router = require("express").Router();

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

module.exports = router;
