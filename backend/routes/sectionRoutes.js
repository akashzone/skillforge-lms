

const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/authMiddleware");
const RoleMiddleware = require("../middleware/roleMiddleware");

const { createSection, getAllSection, updateSectionById } = require("../controller/sectionController");

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

router.put(
    "/:id",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    updateSectionById
)


module.exports = router;