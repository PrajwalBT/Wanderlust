const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET posts");
});

router.get("/:id", (req, res) => {
  res.send("GET posts id");
});

module.exports = router;