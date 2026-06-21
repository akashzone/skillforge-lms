const express = require("express");
const upload = require("../config/multer.js");
const { uploadVideo } = require("../controller/uploadController.js");
const AuthMiddleware = require("../middleware/authMiddleware.js");
const RoleMiddleware = require("../middleware/roleMiddleware.js");

const router = express.Router();

router.post(
    "/",
    AuthMiddleware,
    RoleMiddleware("instructor"),
    upload.single("lecture"),
    uploadVideo
);

module.exports = router;