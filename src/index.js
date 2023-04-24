const app = require('./middlewares');
const axios = require("axios");

const { getCookingTools, getAllIngredients } = require('./db.js');
const { processApiResponse } = require('./apiResponseDataScrubber.js');

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

require('dotenv').config();

const recipeStore = {};

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

// route to send recipe to front end
app.get("/api/recipe", (req, res) => {
  const recipeValues = Object.values(recipeStore);

  if (recipeValues.length >= 2) {
    const lastTwoRecipes = recipeValues.slice(-2);
    res.json(lastTwoRecipes);
    console.log(lastTwoRecipes);
  } else {
    res.status(404).send("No recipes found");
  }
});

// route to provide cookingTools to the preferences page
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

// route to provide allingredients to the ingredients page
app.get("/api/ingredients", (req, res) => {
  Promise.all([getAllIngredients()])
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

  const { mealType, selectedTools, skillLevel, cookingTime, measurementSelection, gourmetMode, strictMode, selectedAllergies, ingredients } = req.body;

  console.log("Index.js line 90, Received data:", req.body);

  const gourmetModeCondition = gourmetMode ? "Include some additional ingredients for a tastier meal. " : "";
  const strictModeCondition = strictMode ? "Strictly use the provided ingredients. " : "";
  const serves = 4;

  const prompt = 
`Please provide a ${skillLevel} ${mealType} recipe that meets the following criteria:
- Serves: ${serves} people
- Cooking time: around ${cookingTime} minutes (mandatory)
- Ingredients: ${ingredients.join(", ")}
- Measurement units: ${measurementSelection}
- Allergies: ${selectedAllergies.join(", ")}
- Tools: ${selectedTools.join(", ")}

${gourmetModeCondition}${strictModeCondition}

Please format the response as follows and ensure to include cooking time and detailed nutrition information per serve:

*Recipe Name:* {Recipe Name}
*Ingredients:*
{Ingredient 1}
{Ingredient 2}
...
*Instructions:*
{Step 1}
{Step 2}
...
*Calories per serve:* {Calories}
*Cooking Time:* {Cooking Time}
*Nutrition Information (per serving):*
- Calories: {Calories}
- Fat: {Fat in grams}
- Saturated Fat: {Saturated Fat in grams} 
- Trans Fat: {Trans Fat in grams} 
- Cholesterol: {Cholesterol in milligrams} 
- Sodium: {Sodium in milligrams} 
- Carbohydrates: {Carbohydrates in grams}
- Fiber: {Fiber in grams} 
- Sugars: {Sugars in grams} 
- Protein: {Protein in grams}`;
  
  console.log('index.js line 132 OPENAI prompt', prompt);

  const params = {
    prompt,
    model: "text-davinci-003",
    max_tokens: 800,
    temperature: 0,
  };

  const params2 = {
    prompt: `Please provide a COMPLETELY different recipe from the first requested recipe. It should be an ${skillLevel} ${mealType} recipe that meets the following criteria:
    - Serves: ${serves} people
    - Cooking time: around ${cookingTime} minutes (mandatory)
    - Ingredients: ${ingredients.join(", ")}
    - Measurement units: ${measurementSelection}
    - Allergies: ${selectedAllergies.join(", ")}
    - Tools: ${selectedTools.join(", ")}
    
    ${gourmetModeCondition}${strictModeCondition}
    
    Please format the response as follows and ensure to include cooking time and detailed nutrition information per serve:
    
    *Recipe Name:* {Recipe Name}
    *Ingredients:*
    {Ingredient 1}
    {Ingredient 2}
    ...
    *Instructions:*
    {Step 1}
    {Step 2}
    ...
    *Calories per serve:* {Calories}
    *Cooking Time:* {Cooking Time}
    *Nutrition Information (per serving):*
    - Calories: {Calories}
    - Fat: {Fat in grams}
    - Saturated Fat: {Saturated Fat in grams}
    - Trans Fat: {Trans Fat in grams} 
    - Cholesterol: {Cholesterol in milligrams} 
    - Sodium: {Sodium in milligrams} 
    - Carbohydrates: {Carbohydrates in grams}
    - Fiber: {Fiber in grams} 
    - Sugars: {Sugars in grams} 
    - Protein: {Protein in grams}`,
    model: "text-davinci-003",
    max_tokens: 800,
    temperature: 1,
  };

  Promise.all([
    openaiClient.post("https://api.openai.com/v1/completions", params),
    openaiClient.post("https://api.openai.com/v1/completions", params2),
  ])
    .then(([result1, result2]) => {
      console.log('Index.js line 187 raw data from OpenAi', result1);
      console.log('Index.js line 188 raw data from OpenAi', result2);

      const recipe1 = processApiResponse(result1, 1);
      const recipe2 = processApiResponse(result2, 2);

      return Promise.all([
        googleImagesClient.get("", { params: { q: recipe1.name + " recipe meal food high resolution", num: 1 } }),
        googleImagesClient.get("", { params: { q: recipe2.name + " meal food high resolution", num: 1 } }),
      ]).then(([googleImagesResult1, googleImagesResult2]) => {
        // Update the image property for both recipes with the image links
        recipe1.image = googleImagesResult1.data.items[0].link;
        recipe2.image = googleImagesResult2.data.items[0].link;
         
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

