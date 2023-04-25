const express = require("express");

module.exports = (recipeStore) => {
  const router = express.Router();

  router.get("/api/recipe", (req, res) => {
    const recipeValues = Object.values(recipeStore);

    console.log('recipe.js line 9', recipeValues);

    if (recipeValues.length >= 2) {
      const lastTwoRecipes = recipeValues.slice(-2);
      res.json(lastTwoRecipes);
    } else {
      res.status(404).send("No recipes found");
    }
  });

  return router;
};