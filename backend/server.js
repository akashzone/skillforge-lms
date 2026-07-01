require("dotenv").config();

//Routes
const AuthRoutes = require("./routes/authRoutes");
const CourseRoutes = require("./routes/courseRoutes");
const SectionRoutes = require("./routes/sectionRoutes");
const LessonRoutes = require("./routes/lessonRoutes.js");
const UploadRoutes = require("./routes/uploadRoutes.js");
const EnrollRoutes = require("./routes/enrollRoutes.js");
const ProgressRoutes = require("./routes/progressRoutes.js");

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
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
const allowedOrigins = ["http://localhost:5173", process.env.FRONTEND_URL];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

connectDB();

app.use("/api/auth", AuthRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/sections", SectionRoutes);
app.use("/api/lessons", LessonRoutes);
app.use("/api/uploads", UploadRoutes);
app.use("/api/enroll", EnrollRoutes);
app.use("/api/progress", ProgressRoutes);

app.get("/api/test", AuthMiddleware, (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
