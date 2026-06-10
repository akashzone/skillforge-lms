const express = require("express");
const { registerUser } = require("../controller/authController");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.post("/register", registerUser);

// router.post("/login", loginUser);

module.exports = router;