const mongoose = require("mongoose");

const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const GlobalMessage = require("../models/GlobalMessage");

// @desc        Get global messages
// @route       GET /api/messages/global
// @access      authenticate

exports.globalMessages = (req, res) => {
  GlobalMessage.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "fromObj",
      },
    },
  ])
    .project({
      "fromObj.password": 0,
      "fromObj.__v": 0,
      "fromObj.date": 0,
    })
    .exec((err, messages) => {
      if (err) {
        res.status(400).json({ message: "failed" });
      } else {
        res.status(200).json(messages);
      }
    });
};

// @desc        Post global message
// @route       POST /api/messages/global
// @access      authenticate

exports.createGlobalMessages = (req, res) => {
  let message = new GlobalMessage({
    from: req.user.userId,
    body: req.body.body,
  });

  req.io.sockets.emit("messages", req.body.body);

  message.save((err) => {
    if (err) {
      res.status(400).json({ message: "failed" });
    } else {
      res.status(200).json({ message: "Success" });
    }
  });
};

// @desc        Get conversations list
// @route       GET /api/messages/conversations
// @access      private

exports.conversationList = (req, res) => {
  let from = mongoose.Types.ObjectId(req.user.userId);
  Conversation.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "recipients",
        foreignField: "_id",
        as: "recipientObj",
      },
    },
  ])
    .match({ recipients: { $all: [{ $elemMatch: { $eq: from } }] } })
    .project({
      "recipientObj.password": 0,
      "recipientObj.__v": 0,
      "recipientObj.date": 0,
    })
    .exec((err, conversations) => {
      if (err) {
        res.status(400).json({ message: "failed" });
      } else {
        res.status(200).json(conversations);
      }
    });
};

// @desc    Get messages from conversation based on to & from
// @route   GET /api/messages/conversations/query
// @access  private

exports.conversationMessages = (req, res) => {
  let user1 = mongoose.Types.ObjectId(req.user.userId);
  let user2 = mongoose.Types.ObjectId(req.query.userId);
  Message.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "to",
        foreignField: "_id",
        as: "toObj",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "from",
        foreignField: "_id",
        as: "fromObj",
      },
    },
  ])
    .match({
      $or: [
        { $and: [{ to: user1 }, { from: user2 }] },
        { $and: [{ to: user2 }, { from: user1 }] },
      ],
    })
    .project({
      "toObj.password": 0,
      "toObj.__v": 0,
      "toObj.date": 0,
      "fromObj.password": 0,
      "fromObj.__v": 0,
      "fromObj.date": 0,
    })
    .exec((err, messages) => {
      if (err) {
        res.status(400).json({ message: "failed" });
      } else {
        res.status(200).json(messages);
      }
    });
};

// @desc        Post private message
// @route       POST /api/messages/conversations
// @access      private

exports.createConversationMessages = (req, res) => {
  let from = mongoose.Types.ObjectId(req.user.userId);
  let to = mongoose.Types.ObjectId(req.body.to);

  Conversation.findOneAndUpdate(
    {
      recipients: {
        $all: [{ $elemMatch: { $eq: from } }, { $elemMatch: { $eq: to } }],
      },
    },
    {
      recipients: [req.user.userId, req.body.to],
      lastMessage: req.body.body,
      date: Date.now(),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true },
    function (err, conversation) {
      if (err) {
        res.status(400).json({ message: "failed" });
      } else {
        let message = new Message({
          conversation: conversation._id,
          to: req.body.to,
          from: req.user.userId,
          body: req.body.body,
        });

        req.io.sockets.emit("messages", req.body.body);

        message.save((err) => {
          if (err) {
            res.status(400).json({ message: "failed" });
          } else {
            res
              .status(200)
              .json({ message: "Success", conversationId: conversation._id });
          }
        });
      }
    }
  );
};
