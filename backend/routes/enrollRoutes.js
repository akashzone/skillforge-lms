

const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const { enrollCourse, getEnrollCourses, checkEnrollmentStatus } = require("../controller/enrollController.js")
const express = require("express");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("student"),
    enrollCourse
)

router.get(
    "/:courseId",
    AuthMiddleware,
    RoleMiddleware("student"),
    checkEnrollmentStatus
)

router.get(
    "/",
    AuthMiddleware,
    RoleMiddleware("student"),
    getEnrollCourses
)

module.exports = router;