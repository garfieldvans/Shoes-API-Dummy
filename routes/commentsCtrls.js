const express = require("express");
const Comments = require("../models/commentCtrl");
const comments = express.Router();

comments.use(express.urlencoded({ extended: false }));
const cors = require("cors");
comments.use(cors());

comments.post("/new", async (req, res) => {
    try {
      console.log(req.body); // Log the request body
      const comment = await Comments.create(req.body);
      res.status(200).json(comment);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

comments.get("/", async (req, res) => {
    try {
      const cmt = await Comments.find({});
      res.status(200).json(cmt);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports = comments