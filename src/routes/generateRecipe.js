const express = require("express");
const { openaiClient, googleImagesClient } = require("../api.js");
const processApiResponse = require('../utils/processApiResponse');
const { recipePromptOne, recipePromptTwo } = require("./recipePrompts.js");

module.exports = (recipeStore) => {
  const router = express.Router();

  router.post("/api/recipe", (req, res) => {
    const { mealType, selectedTools, skillLevel, cookingTime, numberOfServings, gourmetMode, strictMode, selectedAllergies, ingredients } = req.body;

    console.log("generateRecipe.js line 12, Received data:", req.body);

    const gourmetModeCondition = gourmetMode ? "Include additional ingredients for a tastier meal. " : "";
    const strictModeCondition = strictMode ? "Strictly use the provided ingredients. " : "";

    const params = {
      prompt: recipePromptOne({ skillLevel, selectedTools, mealType, numberOfServings, cookingTime, ingredients, selectedAllergies, gourmetModeCondition, strictModeCondition }),
      model: "text-davinci-003",
      max_tokens: 750,
      temperature: 0,
    };

    const params2 = {
      prompt: recipePromptTwo({ skillLevel, selectedTools, mealType, numberOfServings, cookingTime, ingredients, selectedAllergies, gourmetModeCondition, strictModeCondition }),
      model: "text-davinci-003",
      max_tokens: 750,
      temperature: 1,
    };

    // google images api

    Promise.all([
      openaiClient.post("https://api.openai.com/v1/completions", params),
      openaiClient.post("https://api.openai.com/v1/completions", params2),
    ])
      .then(([result1, result2]) => {
        console.log('generateRecipe.js line 38 raw data from OpenAi', result1);
        console.log('generateRecipe.js line 39 raw data from OpenAi', result2);

        const recipe1 = processApiResponse(result1, 1);
        const recipe2 = processApiResponse(result2, 2);

        return Promise.all([
          googleImagesClient.get("", { params: { q: recipe1.name + " recipe meal food high quality high resolution", num: 1 } }),
          googleImagesClient.get("", { params: { q: recipe2.name + " recipe meal food high quality high resolution", num: 1 } }),
        ]).then(([googleImagesResult1, googleImagesResult2]) => {
          // Update the image property for both recipes with the image links
          recipe1.image = googleImagesResult1.data.items[0].link;
          recipe2.image = googleImagesResult2.data.items[0].link;

          console.log("generateRecipe.js line 52, recipe1 image link::", googleImagesResult1.data.items[0].link);
          // console.log("generateRecipe.js line 32, recipe2 image link:", googleImagesResult1.data.items[1].link);


          const recipeId1 = Date.now().toString();
          const recipeId2 = (Date.now() + 1).toString();
          recipeStore[recipeId1] = recipe1;
          recipeStore[recipeId2] = recipe2;

          res.json([{ id: recipeId1, ...recipe1 }, { id: recipeId2, ...recipe2 }]);
        })
          .catch((err) => {
            console.log(err);
            res.status(500).send("An error occurred");
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send("An error occurred");
      });
  });

  return router;
};