require("dotenv").config();

const PORT = process.env.PORT
const DATABASE = process.env.DATABASE_URL

const express = require("express");
const cors = require('cors')
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/shoesModels");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: false}));


//connection to db
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connected to db");
    app.listen(PORT || 4001, () => console.log("server running"));
  })
  .catch((error) => {
    console.log(error);
  });
  
  app.get("/", (req, res) => {
    res.send("This is my first API");
  });

  // create new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

// get all products data
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get a product by id
app.get("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const products = await Product.findById(id);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// update product data
app.put("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.findByIdAndUpdate(id, req.body);
      //data doesn't exist
      if(!products){
        return res.status(404).json({message: `product with id ${id} is not found` })
      }

      const updatedProduct = await Product.findById(id)
      res.status(200).json(updatedProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // delete a product data
  app.delete("/products/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const products = await Product.findByIdAndDelete(id);

      // if data doesn't exist
      if(!products){
        return res.status(404).json({message: `product with id ${id} is not found` })
      }
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
