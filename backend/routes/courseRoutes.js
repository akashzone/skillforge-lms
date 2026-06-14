const express = require("express");
const { createCourse,getCourses } = require("../controller/courseController");
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

module.exports = router;