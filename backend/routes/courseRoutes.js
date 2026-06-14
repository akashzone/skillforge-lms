const express = require("express");
const { createCourse } = require("../controller/courseController");
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const router = express.Router();


router.post(
    "/courses",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createCourse
);

module.exports = router;