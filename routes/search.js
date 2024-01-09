const express = require("express");
const Product = require("../models/shoesModels");
const searchroutes = express.Router();

searchroutes.use(express.urlencoded({ extended: false }));
const cors = require("cors");
searchroutes.use(cors());

searchroutes.get("/q", async (req, res) => {
  try {
    let query = req.query.query || "";

    // If the query contains %20, replace it with a space
    query = query.replace(/%20/g, " ");

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;

    const startIndex = (page - 1) * pageSize;

    const individualWords = query.split(' ');

    // Use MongoDB $regex operator for case-insensitive search
    const results = await Product.find({
        $or: [
          // Search for each individual word separately
          ...individualWords.map(word => (
            {
              $or: [
                { name: { $regex: new RegExp(word, 'i') } },
                { description: { $regex: new RegExp(word, 'i') } }
              ]
            }
          ))
        ]
      }).skip(startIndex).limit(pageSize);

      if (results.length === 0) {
        // If no results for the combination of words, return results for each individual word
        const separateResults = await Product.find({
          $or: individualWords.map(word => (
            {
              $or: [
                { name: { $regex: new RegExp(word, 'i') } },
                { description: { $regex: new RegExp(word, 'i') } }
              ]
            }
          ))
        }).skip(startIndex).limit(pageSize);
  
        res.json(separateResults);
      } else {
        res.json(results);
      }
    } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


searchroutes.get("/filter", async (req, res) => {
  try {
    const gender = req.query.gender || "";
    const category = req.query.category || "";
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    const startIndex = (page - 1) * pageSize;

    let filterCriteria = {};

    if (gender && category) {
      // Both gender and category provided
      filterCriteria = {
        'filters.gender': { $regex: new RegExp(gender, 'i') },
        'filters.category': { $regex: new RegExp(category, 'i') }
      };
    } else if (gender) {
      // Only gender provided
      filterCriteria = {
        'filters.gender': { $regex: new RegExp(gender, 'i') }
      };
    } else if (category) {
      // Only category provided
      filterCriteria = {
        'filters.category': { $regex: new RegExp(category, 'i') }
      };
    }

    // Use MongoDB $regex operator for case-insensitive search
    const results = await Product.find(filterCriteria).skip(startIndex).limit(pageSize);

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = searchroutes;
