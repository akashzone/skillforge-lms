
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const express = require("express");
const { createLesson } = require("../controller/lessonController");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createLesson
);

module.exports = router;