const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("GET users");
});

router.get("/:id", (req, res) => {
  res.send("GET users id");
});

module.exports = router;