const express = require("express");
const Product = require("../models/shoesModels");
const routes = express.Router()

routes.use(express.urlencoded({extended: false}));
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


module.exports = routes