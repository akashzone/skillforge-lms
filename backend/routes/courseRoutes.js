
const express = require("express");
const router = express.Router();

const { createCourse, getInstructorCourses, getCourses, getCourseById , getInstructorCourseById ,getEnrolledCourses,  updateCourseById, deleteCourseById } = require("../controller/courseController");
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");

// -- used by student

router.get("/",AuthMiddleware,RoleMiddleware("student"), getCourses);
router.get("/:id", AuthMiddleware, RoleMiddleware("student"), getCourseById);

// -- used by instructor 
router.get("/instructor/my-courses/:id", AuthMiddleware, RoleMiddleware("instructor"), getInstructorCourseById);
router.get("/instructor/my-courses", AuthMiddleware, RoleMiddleware("instructor"), getInstructorCourses);


// -- used by instructor for edit/update/create
router.post("/", AuthMiddleware, RoleMiddleware("instructor"), createCourse);
router.put("/:id", AuthMiddleware, RoleMiddleware("instructor"), updateCourseById);
router.delete("/:id", AuthMiddleware, RoleMiddleware("instructor"), deleteCourseById);

module.exports = router;