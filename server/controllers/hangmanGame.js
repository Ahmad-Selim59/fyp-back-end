const HangmanGame = require("../models/HangmanModel");

// posting a new user data with points to the database
const postHangmanGame = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await HangmanGame.findOne({ user });
    if (checkUser) {
      res.json({ message: "user already exists" });
    } else {
      const newHangmanGame = new HangmanGame({
        user,
        points,
      });
      await newHangmanGame.save();

      res.status(201).json(newHangmanGame);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// updating the user data with points to the database
const updateHangmanGame = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await HangmanGame.findOne({ user });
    if (checkUser) {
      const updatedUserHangman = await HangmanGame.findOneAndUpdate(
        { user },
        {
          $set: {
            points: points,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUserHangman);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getting all the user data with points from the database
const getAllHangmanGames = async (req, res) => {
  try {
    const allHangmanGames = await HangmanGame.find();
    res.status(200).json(allHangmanGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postHangmanGame,
  getAllHangmanGames,
  updateHangmanGame,
};
