const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
    gender: {
      type: String,
    },
   category: {
      type: [String],
    },       
  });

const shoesProductScheme = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter the product name"],
    },

    quantity: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: false,
      default:
        "https://uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/search-product-icon.png",
    },
    review: {
      type: Number,
      require: false,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    filters: [filterSchema],
  },
  {
    timestamps: true,
  },
  
);

const Product = mongoose.model("Product", shoesProductScheme);

module.exports = Product;
