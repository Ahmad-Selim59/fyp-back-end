const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LetterGameSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const LetterGame = mongoose.model("LetterGame", LetterGameSchema);

module.exports = LetterGame;
