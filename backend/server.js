const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());

// CORS middleware to allow requests from the frontend
cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend's URL and port
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})

app.use(cors());

// Basic GET route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Test API is working!" });
});

connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
