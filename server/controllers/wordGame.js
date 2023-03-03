const WordGame = require("../models/wordGame");
const postAnswer = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await WordGame.findOne({ user });
    if (checkUser) {
      res.json({ message: "user already exists" });
    } else {
      const newWordGame = new WordGame({
        user,
        points,
      });
      await newWordGame.save();

      res.status(201).json(newWordGame);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const updateAnswer = async (req, res) => {
  try {
    const { user, points } = req.body;
    const checkUser = await WordGame.findOne({ user });
    if (checkUser) {
      const updatedUser = await WordGame.findOneAndUpdate(
        { user },
        {
          $set: {
            points: points,
          },
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllAnswers = async (req, res) => {
  try {
    const allAnswers = await WordGame.find();
    res.status(200).json(allAnswers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  postAnswer,
  getAllAnswers,
  updateAnswer,
};
