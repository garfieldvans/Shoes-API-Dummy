const express = require("express");
const Product = require("../models/shoesModels");
const searchroutes = express.Router();

searchroutes.use(express.urlencoded({ extended: false }));
const cors = require("cors");
searchroutes.use(cors());

searchroutes.get("/q", async (req, res) => {
    try {
      const query = req.query.query;
  
      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
  
      const startIndex = (page - 1) * pageSize;
  
      // Use MongoDB $regex operator for case-insensitive search
      const results = await Product.find({
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } }
        ]
      }).skip(startIndex).limit(pageSize);
  
      const totalItems = await Product.countDocuments({
        $or: [
          { name: { $regex: new RegExp(query, 'i') } },
          { description: { $regex: new RegExp(query, 'i') } }
        ]
      });
    
        if (results.length === 0) {
          return res.json({ message: `Product with name ${query} not found` });
        }

        const totalPages = Math.ceil(totalItems / pageSize);

    if (results.length === 0) {
      return res.json({ message: `Product with name ${query} not found` });
    }
    
        res.json({
            results,
            pagination: {
              currentPage: page,
              totalPages,
              totalItems
            }
          });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

module.exports = searchroutes;
