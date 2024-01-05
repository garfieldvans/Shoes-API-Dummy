require("dotenv").config();

const port = process.env.PORT
const express = require("express");
const app = require('./app')

app.use(express.json());
app.use(express.urlencoded({extended: false}));




  app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
  })