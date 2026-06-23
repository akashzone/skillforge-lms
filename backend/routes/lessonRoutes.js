const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");
const express = require("express");
const { createLesson, updateLessonById, uploadLesson, deleteById, getLessonById } = require("../controller/lessonController");
const upload = require("../config/multer");
const router = express.Router();

router.post("/", AuthMiddleware, RoleMiddleware("instructor"), createLesson);
router.get("/:id",AuthMiddleware, RoleMiddleware("instructor"), getLessonById);
router.put("/:id", AuthMiddleware, RoleMiddleware("instructor"), updateLessonById);
router.delete("/:id", AuthMiddleware, RoleMiddleware("instructor"), deleteById);

module.exports = router;