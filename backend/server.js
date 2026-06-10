const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
require("dotenv").config();

app.use(express.json());

// Basic GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
