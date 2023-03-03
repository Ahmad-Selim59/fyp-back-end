const express = require("express");
const {
  getAllLetterGames,
  postLetterGame,
  updateLetterGame,
} = require("../controllers/letterGame");

const router = express.Router();
router.get("/", getAllLetterGames);
router.post("/", postLetterGame);
router.put("/", updateLetterGame);

module.exports = router;
