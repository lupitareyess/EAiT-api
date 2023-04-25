 function extractRecipeName(recipeLines) {
  return recipeLines.shift().replace(/\*Recipe Name:\* /, "");
}

function extractRecipeIngredients(recipeLines, ingredientsStartIndex, instructionsStartIndex) {
  return recipeLines
    .slice(ingredientsStartIndex + 1, instructionsStartIndex)
    .filter((line) => line.trim().length > 0)
    .map((ingredient) => ingredient.startsWith("- ") ? ingredient.substring(2) : ingredient);
}

function extractRecipeInstructions(recipeLines, instructionsStartIndex, caloriesStartIndex) {
  return recipeLines
    .slice(instructionsStartIndex + 1, caloriesStartIndex)
    .filter((line) => line.trim().length > 0);
}

function extractRecipeNutrition(recipeLines, nutritionStartIndex) {
  return recipeLines
    .slice(nutritionStartIndex + 1, nutritionStartIndex + 1 + 4)
    .filter((line) => line.trim().length > 0)
    .map((nutrition) => nutrition.startsWith("- ") ? nutrition.substring(2) : nutrition.trim());
}

function extractCookingTime(recipeLines, cookingTimeStartIndex) {
  return cookingTimeStartIndex >= 0
    ? (recipeLines[cookingTimeStartIndex].includes("*Cooking Time:*")
      ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
      : (recipeLines[cookingTimeStartIndex].includes("Cooking Time:")
        ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
        : recipeLines[cookingTimeStartIndex]))
    : "Not specified";
}

function extractCaloriesPerServe(recipeLines, caloriesStartIndex) {
  return caloriesStartIndex >= 0 ? recipeLines[caloriesStartIndex].replace(/\*Calories per serve:\* /, "") : "Not specified";
}

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

module.exports = {
  processApiResponse,
};
