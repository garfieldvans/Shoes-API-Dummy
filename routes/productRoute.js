const express = require("express");
const Product = require("../models/shoesModels");
const routes = express.Router()

routes.use(express.urlencoded({extended: false}));
const cors = require('cors')
routes.use(cors())
// create new product
routes.post("/new", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get all products data
routes.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

routes.get("/newest", async (req, res) => {
  try {
    // Use MongoDB sort and limit to get the newest added product
    const newestProduct = await Product.findOne().sort({ createdAt: -1 }).limit(1);

    res.json(newestProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a product by id
routes.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update product data
routes.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndUpdate(id, req.body);
    //data doesn't exist
    if (!products) {
      return res
        .status(404)
        .json({ message: `product with id ${id} is not found` });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// delete a product data
routes.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findByIdAndDelete(id);

    // if data doesn't exist
    if (!products) {
      return res
        .status(404)
        .json({ message: `product with id ${id} is not found` });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get products sorted by category
routes.get('/category?', async (req, res) => {
  try {
    const productsByCategory = await Product.find().sort({ category: 1 }); // Sorting in ascending order by category
    res.json(productsByCategory);
  } catch (error) {
    console.error('Error fetching products sorted by category:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

routes.get('/filters', async (req, res) => {
  try {
    // Extract filter parameters from the query string
    const { gender, category } = req.query;

    // Construct the filter criteria
    const filterCriteria = {};

    if (gender) {
      filterCriteria["filters.gender"] = gender;
    }

    if (category) {
      filterCriteria["filters.category"] = category;
    }

    // Find products that match the filter criteria
    const products = await Product.find(filterCriteria);

    // Send the products as a JSON response
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = routes