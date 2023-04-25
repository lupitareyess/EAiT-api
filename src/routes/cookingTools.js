const express = require("express");
const router = express.Router();
const { getCookingTools } = require("../db.js");

router.get("/api/test", (req, res) => {
  getCookingTools()
    .then((getCookingTools) => {
      res.json(getCookingTools);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
