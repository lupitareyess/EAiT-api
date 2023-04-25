const extractRecipeName = require('./extractRecipeName');
const extractRecipeIngredients = require('./extractRecipeIngredients');
const extractRecipeInstructions = require('./extractRecipeInstructions');
const extractRecipeNutrition = require('./extractRecipeNutrition');
const extractCookingTime = require('./extractCookingTime');
const extractCaloriesPerServe = require('./extractCaloriesPerServe');

function processApiResponse(result) {
 const recipeText = result.data.choices[0].text;

  const recipeLines = recipeText.split("\n").filter((line) => line.trim().length > 0);

  const recipeName = extractRecipeName(recipeLines);
  const ingredientsStartIndex = recipeLines.findIndex((line) => line.includes("Ingredients:"));
  const instructionsStartIndex = recipeLines.findIndex((line) => line.includes("Instructions:"));
  const caloriesStartIndex = recipeLines.findIndex((line) => line.includes("Calories per serve:"));
  const cookingTimeStartIndex = recipeLines.findIndex((line) => line.includes("Cooking Time:"));
  const nutritionStartIndex = recipeLines.findIndex((line) => line.includes("Nutrition Information (per serving):"));

  const recipeIngredients = extractRecipeIngredients(recipeLines, ingredientsStartIndex, instructionsStartIndex);
  const recipeInstructions = extractRecipeInstructions(recipeLines, instructionsStartIndex, caloriesStartIndex);
  const recipeNutrition = extractRecipeNutrition(recipeLines, nutritionStartIndex);
  const cookingTime = extractCookingTime(recipeLines, cookingTimeStartIndex);
  const caloriesPerServe = extractCaloriesPerServe(recipeLines, caloriesStartIndex);
  
  return {
    name: recipeName,
    ingredients: recipeIngredients,
    instructions: recipeInstructions,
    cookingTime: cookingTime,
    calories: caloriesPerServe,
    nutrition: recipeNutrition,
    image: null, // Set the image to null for now; we'll update it later
  };
}

module.exports = processApiResponse;