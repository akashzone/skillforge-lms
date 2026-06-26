

const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const { enrollCourse, getEnrollCourses } = require("../controller/enrollController.js")
const express = require("express");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("student"),
    enrollCourse
)

router.get(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("student"),
    getEnrollCourses
)

module.exports = router;