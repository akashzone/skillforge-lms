
const express = require("express");
const router = express.Router();

const { createCourse, getCourses, getCourseById, updateCourseById, deleteCourseById } = require("../controller/courseController");
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");

router.post("/", AuthMiddleware, RoleMiddleware("instructor"), createCourse);
router.get("/", AuthMiddleware, RoleMiddleware("instructor"), getCourses);
router.get("/:id", AuthMiddleware, RoleMiddleware("instructor"), getCourseById);
router.put("/:id", AuthMiddleware, RoleMiddleware("instructor"), updateCourseById);
router.delete("/:id", AuthMiddleware, RoleMiddleware("instructor"), deleteCourseById);

module.exports = router;