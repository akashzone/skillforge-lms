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

const rawFrontendUrl = process.env.FRONTEND_URL || "";
const frontendUrls = rawFrontendUrl.split(",").map(url => url.trim().replace(/\/$/, ""));

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  ...frontendUrls
].filter(Boolean);

console.log("Allowed Origins:", allowedOrigins);
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no Origin (Postman, curl, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Normalize origin string by removing trailing slash if present
      const normalizedOrigin = origin.replace(/\/$/, "");

      if (allowedOrigins.includes(normalizedOrigin) || normalizedOrigin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

connectDB();

app.use("/api/auth", AuthRoutes);
app.use("/api/courses", CourseRoutes);
app.use("/api/sections", SectionRoutes);
app.use("/api/lessons", LessonRoutes);
app.use("/api/uploads", UploadRoutes);
app.use("/api/enroll",EnrollRoutes);
app.use("/api/progress",ProgressRoutes);

app.get("/api/test", AuthMiddleware, (req, res) => {
  res.json({ message: "API is working!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});