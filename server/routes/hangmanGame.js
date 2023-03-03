const express = require("express");
const {
  postHangmanGame,
  getAllHangmanGames,
  updateHangmanGame,
} = require("../controllers/hangmanGame");

const router = express.Router();

router.get("/", getAllHangmanGames);
router.post("/", postHangmanGame);
router.put("/", updateHangmanGame);

module.exports = router;
