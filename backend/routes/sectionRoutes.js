
const express = require("express");
const router = express.Router();

const AuthMiddleware = require("../middleware/authMiddleware");
const RoleMiddleware = require("../middleware/roleMiddleware");
const { createSection, getAllSection, updateSectionById, deleteSectionById } = require("../controller/sectionController");
const { getLessons } = require("../controller/lessonController");


// -- Student --

router.get("/student/:id", AuthMiddleware, RoleMiddleware("student"), getAllSection);
router.get("/student/:id/lessons", AuthMiddleware, RoleMiddleware("student"), getLessons);

// -- Instructor --

router.post("/", AuthMiddleware, RoleMiddleware("instructor"), createSection);
router.get("/:id", AuthMiddleware, RoleMiddleware("instructor"), getAllSection);
router.get("/:id/lessons",AuthMiddleware, RoleMiddleware("instructor"), getLessons);
router.put("/:id", AuthMiddleware, RoleMiddleware("instructor"), updateSectionById);
router.delete("/:id", AuthMiddleware, RoleMiddleware("instructor"), deleteSectionById);

module.exports = router;