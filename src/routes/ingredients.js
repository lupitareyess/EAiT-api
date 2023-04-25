const express = require("express");
const router = express.Router();
const { getAllIngredients } = require("../db.js");

router.get("/api/ingredients", (req, res) => {
  Promise.all([getAllIngredients()])
    .then(([categories, subCategories, getAllIngredients]) => {
      res.json({ categories, subCategories, getAllIngredients });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});

module.exports = router;
