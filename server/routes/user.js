const express = require("express");
const {
  login,
  signup,
  loggedIn,
  signout,
  getAllUser,
  sendResetPassword,
  resetPassword,
} = require("../controllers/user");
const { auth } = require("../middleware/auth");

const route = express.Router();

route.post("/login", login);
route.post("/signup", signup);
route.get("/loggedIn", loggedIn);
route.post("/send-reset-password", sendResetPassword);
route.post("/resetPassword/:token", resetPassword);
route.get("/", auth, getAllUser);
route.post("/signout", auth, signout);

module.exports = route;
