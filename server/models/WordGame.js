const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WordGameSchema = new Schema(
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

const WordGame = mongoose.model("WordGame", WordGameSchema);

module.exports = WordGame;
