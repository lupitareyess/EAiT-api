const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require("axios");
const app = express();
const client = require('./db');
const bodyParser = require('body-parser');

const { getCookingTools, getAllCategories, getAllSubCategories, getAllIngredients } = require('./db.js');

const port = process.env.PORT || 3001;

const path = require('path');
app.use(morgan('tiny'));
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
require('dotenv').config();

const apiKey = process.env.OPENAI_API_KEY;
const googleCustomSearchKey = process.env.GOOGLE_CUSTOM_SEARCH_KEY;
const googleCustomSearchEngineId = process.env.GOOGLE_CUSTOM_SEARCH_ENGINE_ID;

const openaiClient = axios.create({
  headers: {
    Authorization: "Bearer " + apiKey,
  },
});

const googleImagesClient = axios.create({
  baseURL: "https://www.googleapis.com/customsearch/v1",
  params: {
    key: googleCustomSearchKey,
    cx: googleCustomSearchEngineId,
    searchType: "image",
    imgSize: "large",
    imgType: "photo",
    imgAspectRatio: "4:3",
    q: "",
  },
});

class Recipe {
  constructor(name, ingredients, instructions, cookingTime, calories, image) {
    this.name = name;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.cookingTime = cookingTime;
    this.calories = calories;
    this.image = image;
  }
}

// declare an empty recipe object
let recipe = {};
let tools;
// route to send recipe to front end
app.get("/api/recipe", (req, res) => {
  res.json(recipe);
});

app.get("/api/test", (req, res) => {
  getCookingTools()
    .then((getCookingTools) => {
      res.json(getCookingTools);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});


app.get("/api/ingredients", (req, res) => {
  Promise.all([getAllCategories(), getAllSubCategories(), getAllIngredients()])
    .then(([categories, subCategories, getAllIngredients]) => {
      res.json({ categories, subCategories, getAllIngredients });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("An error occurred");
    });
});


// route to generate recipe using OpenAI
app.post("/api/recipe", (req, res) => {
  const { mealType, selectedTools, skillLevel } = req.body;
  const ingredients = ['papaya', 'chicken', 'cilantro', 'rice', 'red onion', 'celery', 'seaweed'];
  const serves = 4;
  const measurement = 'imperial';
  const prompt = `make me a ${mealType} recipe using ${ingredients.join(", ")}, serves ${serves} people, with Cooking time:, and at the end can you give me the calories per serve as well. the measurement is ${measurement} with one of these tools ${selectedTools}`;


  const params = {
    prompt,
    model: "text-davinci-003",
    max_tokens: 500,
    temperature: 0,
  };

  // data scrubber to ensure the recipe display is clean and consistent.
  openaiClient
    .post("https://api.openai.com/v1/completions", params)
    .then((result) => {
      const recipeText = result.data.choices[0].text;
      const recipeLines = recipeText.split("\n").filter((line) => line.trim().length > 0);
      const recipeName = recipeLines.shift();
      const ingredientsStartIndex = recipeLines.findIndex((line) => line.includes("Ingredients:"));
      const instructionsStartIndex = recipeLines.findIndex((line) => line.includes("Instructions:"));
      const caloriesStartIndex = recipeLines.findIndex((line) => line.includes("Calories per serve:"));
      const cookingTimeStartIndex = recipeLines.findIndex((line) => line.includes("Cooking Time:"));
      const recipeIngredients = recipeLines
        .slice(ingredientsStartIndex + 1, instructionsStartIndex)
        .filter((line) => line.trim().length > 0)
        .map((ingredient) => ingredient.substring(2));
      const recipeInstructions = recipeLines
        .slice(instructionsStartIndex + 1, caloriesStartIndex)
        .filter((line) => line.trim().length > 0);
      const cookingTime = cookingTimeStartIndex >= 0 ? recipeLines[cookingTimeStartIndex].replace("Cooking Time: ", "") : "";
      const caloriesPerServe = recipeLines[caloriesStartIndex].replace("Calories per serve: ", "");

      const googleImagesParams = {
        q: recipeName + " meal food",
        num: 1,
      };

      googleImagesClient
        .get("", { params: googleImagesParams })
        .then((googleImagesResult) => {
          const recipeImage = googleImagesResult.data.items[0].link;
          recipe = {
            name: recipeName,
            ingredients: recipeIngredients,
            instructions: recipeInstructions,
            cookingTime: cookingTime,
            calories: caloriesPerServe,
            image: recipeImage,
          };
          res.json(recipe);
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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
app.use(express.static(path.join(__dirname, 'client', 'build')));