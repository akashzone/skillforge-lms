const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Auth Route");
});

router.post("/register", (req, res) => {
  res.send("Register User");
});

router.post("/login", (req, res) => {
  res.send("Login User");
});

module.exports = router;