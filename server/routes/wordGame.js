const express = require("express");
const {
  postAnswer,
  getAllAnswers,
  updateAnswer,
} = require("../controllers/wordGame");

const router = express.Router();
router.post("/", postAnswer);
router.get("/", getAllAnswers);
router.put("/", updateAnswer);

module.exports = router;
