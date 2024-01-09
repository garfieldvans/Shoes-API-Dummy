const mongoose = require('mongoose')

const categoriesScheme = mongoose.Schema(
    {
        gender : {
            type: String,
            default: 'Universal'
            
        }

    },
    {
        timestamps: true,
    }
)

const Categories = mongoose.model('Categories', categoriesScheme);

module.exports = Categories;