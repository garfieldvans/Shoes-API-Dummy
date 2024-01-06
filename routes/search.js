const express = require("express");
const Product = require("../models/shoesModels");
const searchroutes = express.Router();

searchroutes.use(express.urlencoded({ extended: false }));
const cors = require("cors");
searchroutes.use(cors());

searchroutes.get("/q", async (req, res) => {
  try {
    const products = await Product.find({});
    const query = req.query.query;
    const results = products.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    if (results.length === 0) {
        return res.json({ message: `Product with name ${query} not found` });
      }
    res.json(results);

    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = searchroutes;
