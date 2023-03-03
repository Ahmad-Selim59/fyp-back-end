const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HangmanGameSchema = new Schema(
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

const HangmanGame = mongoose.model("HangmanGame", HangmanGameSchema);

module.exports = HangmanGame;
