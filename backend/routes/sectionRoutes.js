

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/authMiddleware");
const RoleMiddleware = require("../middleware/roleMiddleware");

const { createSection, getAllSection } = require("../controller/sectionController");

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    createSection
)

router.get(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    getAllSection
)

module.exports = router;