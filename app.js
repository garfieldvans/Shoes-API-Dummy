require("dotenv").config();

const express = require("express");
const router = require("./routes/router");
const app = express();
const mongoose = require("mongoose");

const DATABASE = "mongodb+srv://boodat:boodat@cluster0.ur7fh0c.mongodb.net/shoes-API?retryWrites=true&w=majority";
app.use(express.json());

//connection to db
mongoose.set("strictQuery", false);
mongoose
  .connect(DATABASE)
  .then(() => {
    console.log("connected to db");
    // app.listen(P || 4001, () => console.log("server running"));
  })
  .catch((error) => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("This is my first API");
});

app.use("/api", router);

module.exports = app;
