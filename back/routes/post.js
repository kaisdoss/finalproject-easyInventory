const express = require("express");
const authMiddleware = require("../helpers/authMiddleware");
const Post = require("../models/Post");
const router = express.Router();
const User = require("../models/user");

//add new post
router.post("/", authMiddleware, (req, res) => {
  let newPost = new Post({ ...req.body, owner: req.userId });
  newPost
    .save()
    .then((Post) => res.status(201).send(Post))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "sever error" });
    });
});
// get all post
router.get("/", authMiddleware, (req, res) => {
  Post.find()
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server error" });
    });
});

// get user posts
router.get("/myposot", authMiddleware, (req, res) => {
  User.find({ owner: req.userId })
    .then((posts) => res.send(posts))
    .catch((err) => {
      console.error(err.message);
      res.status(500).send({ msg: "server error" });
    });
});

module.exports = router;
