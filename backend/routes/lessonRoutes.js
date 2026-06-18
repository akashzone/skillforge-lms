
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const express = require("express");
const { createLesson, getLessons, updateLessonById } = require("../controller/lessonController");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createLesson
);

router.get(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    getLessons
)

router.put(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    updateLessonById
);

module.exports = router;