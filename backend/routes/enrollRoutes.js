

const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const { enrollCourse } = require("../controller/enrollController.js")
const express = require("express");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("student"),
    enrollCourse
)

module.exports = router;