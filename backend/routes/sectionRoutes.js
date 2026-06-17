

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/authMiddleware");
const RoleMiddleware = require("../middleware/roleMiddleware");

const { createSection } = require("../controller/sectionController");

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createSection
)

module.exports = router;