const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

const userRouter = require("./routes/user");
const messagesRouter = require("./routes/messages");
const wordGameRoute = require("./routes/wordGame");
const hangmanGame = require("./routes/hangmanGame");
const letterGame = require("./routes/letterGame");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// cookies
app.use(cookieParser("123abc"));

app.use(
  cors({
    origin: ["http://localhost:3000", "https://ahmadsle22.onrender.com"],
    credentials: true,
  })
);

// server listens at port 5000
const server = app.listen(5000, () => {
  console.log("server connected!");
});

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connection success"))
  .catch((err) => console.log(err));

app.use(function (req, res, next) {
  req.io = io;
  next();
});

// routes
app.use("/api/user", userRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/wordGame", wordGameRoute);
app.use("/api/hangmanGame", hangmanGame);
app.use("/api/letterGame", letterGame);
