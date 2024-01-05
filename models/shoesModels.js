const mongoose = require('mongoose')

const shoesProductScheme = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please enter the product name"]
        },

        quantity: {
            type: Number,
            required: true,
            default: 0,
        },
        price:{
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: false,
            default: 'https://uxwing.com/wp-content/themes/uxwing/download/logistics-shipping-delivery/search-product-icon.png'
        },

    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model('Product', shoesProductScheme);

module.exports = Product;