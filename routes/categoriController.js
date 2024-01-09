const express = require("express");
const Categories = require("../models/categoryModel");
const ctgrroutes = express.Router();

ctgrroutes.use(express.urlencoded({ extended: false }));
const cors = require("cors");
ctgrroutes.use(cors());
// create new product
ctgrroutes.post("/new", async (req, res) => {
    try {
      console.log(req.body); // Log the request body
      const categori = await Categories.create(req.body);
      res.status(200).json(categori);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  });

ctgrroutes.get("/", async (req, res) => {
    try {
        const categori = await Categories.find({});
        // console.log(categori);
        res.status(200).json(categori);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
});

module.exports = ctgrroutes;
