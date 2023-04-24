  // data scrubber to ensure the recipe display is clean and consistent.

function processApiResponse(result) {
    const recipeText = result.data.choices[0].text;
  
    console.log('apiResponseDataScrubber.js line 4 Raw recipe data:', recipeText); // Added line to print raw recipe data
  
    const recipeLines = recipeText.split("\n").filter((line) => line.trim().length > 0);
    const recipeName = recipeLines.shift().replace(/\*Recipe Name:\* /, "");
    const ingredientsStartIndex = recipeLines.findIndex((line) => line.includes("Ingredients:"));
    const instructionsStartIndex = recipeLines.findIndex((line) => line.includes("Instructions:"));
    const caloriesStartIndex = recipeLines.findIndex((line) => line.includes("Calories per serve:"));
    const cookingTimeStartIndex = recipeLines.findIndex((line) => line.includes("Cooking Time:"));
    const nutritionStartIndex = recipeLines.findIndex((line) => line.includes("Nutrition Information (per serving):"));
    const recipeIngredients = recipeLines
      .slice(ingredientsStartIndex + 1, instructionsStartIndex)
      .filter((line) => line.trim().length > 0)
      .map((ingredient) => ingredient.startsWith("- ") ? ingredient.substring(2) : ingredient);
    const recipeInstructions = recipeLines
      .slice(instructionsStartIndex + 1, caloriesStartIndex)
      .filter((line) => line.trim().length > 0);
    const recipeNutrition = recipeLines
      .slice(nutritionStartIndex + 1, nutritionStartIndex + 1 + 4)
      .filter((line) => line.trim().length > 0)
      .map((nutrition) => nutrition.startsWith("- ") ? nutrition.substring(2) : nutrition.trim());
    const cookingTime = cookingTimeStartIndex >= 0 
      ? (recipeLines[cookingTimeStartIndex].includes("*Cooking Time:*")
        ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
        : (recipeLines[cookingTimeStartIndex].includes("Cooking Time:")
          ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
          : recipeLines[cookingTimeStartIndex]))
      : "Not specified";
    const caloriesPerServe = caloriesStartIndex >= 0 ? recipeLines[caloriesStartIndex].replace(/\*Calories per serve:\* /, "") : "Not specified";
  
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
  