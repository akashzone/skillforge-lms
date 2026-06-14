const express = require("express");
const { createCourse,getCourses, getCourseById,updateCourseById } = require("../controller/courseController");
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const router = express.Router();


router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createCourse
);

router.get(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    getCourses
)

router.get(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    getCourseById
)

router.put(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    updateCourseById
)

module.exports = router;