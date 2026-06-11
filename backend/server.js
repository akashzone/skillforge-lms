require("dotenv").config();
const AuthRoutes = require("./routes/authRoutes");

// Create Express app
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Mongoose and DB connection
const mongoose = require("mongoose");
const connectDB = require("./config/db");

// middleware 
const cors = require("cors");


// Middleware to parse JSON bodies
app.use(express.json());


// CORS middleware to allow requests from the frontend
const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", AuthRoutes);

app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

// Start the server
app.listen(PORT, () => {
  console.log(process.env.JWT_SECRET);
  console.log(`Server is running on port ${PORT}`);
});
