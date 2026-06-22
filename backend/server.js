require("dotenv").config();

//Routes
const AuthRoutes = require("./routes/authRoutes");
const CourseRoutes = require("./routes/courseRoutes");
const SectionRoutes = require("./routes/sectionRoutes");
const LessonRoutes = require("./routes/lessonRoutes.js");
const UploadRoutes = require("./routes/uploadRoutes.js");

//AuthMiddleware
const AuthMiddleware = require("./middleware/authMiddleware.js");

//Express
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

//Mongoose
const mongoose = require("mongoose");
const connectDB = require("./config/db");

//middlewares
const cors = require("cors");
const path = require("path");

app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

connectDB();

app.use("/api/auth", AuthRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/sections", SectionRoutes);
app.use("/api/lessons", LessonRoutes);
app.use("/api/uploads", UploadRoutes);

app.get("/api/test", AuthMiddleware, (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});