const express = require("express");
const {
  globalMessages,
  createGlobalMessages,
  conversationList,
  conversationMessages,
  createConversationMessages,
} = require("../controllers/messages");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.get("/global", auth, globalMessages);
router.post("/global", auth, createGlobalMessages);
router.get("/conversations", auth, conversationList);
router.get("/conversations/query", auth, conversationMessages);
router.post("/", auth, createConversationMessages);

module.exports = router;
