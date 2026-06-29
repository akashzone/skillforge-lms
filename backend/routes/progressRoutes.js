
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const express = require("express");

const { createProgress } = require("../controller/progressController.js")
const router = express.Router();

router.post(
    "/:lessonId",
    AuthMiddleware,
    RoleMiddleware("student"),
    createProgress
)

module.exports = router;