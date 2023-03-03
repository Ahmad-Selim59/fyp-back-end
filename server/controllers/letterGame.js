const LetterGame = require("../models/LetterConversation");

// posting a new user data with points to the database
const postLetterGame = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await LetterGame.findOne({ user });
    if (checkUser) {
      res.json({ message: "user already exists" });
    } else {
      const newLetterGame = new LetterGame({
        user,
        points,
      });
      await newLetterGame.save();

      res.status(201).json(newLetterGame);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// updating the user data with points to the database
const updateLetterGame = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await LetterGame.findOne({ user });
    if (checkUser) {
      const updatedUserLetter = await LetterGame.findOneAndUpdate(
        { user },
        {
          $set: {
            points: points,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUserLetter);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// getting all the user data with points from the database
const getAllLetterGames = async (req, res) => {
  try {
    const allLetterGames = await LetterGame.find();
    res.status(200).json(allLetterGames);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postLetterGame,
  getAllLetterGames,
  updateLetterGame,
};
