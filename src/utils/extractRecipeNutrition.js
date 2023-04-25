function extractRecipeNutrition(recipeLines, nutritionStartIndex) {
  const MAX_NUTRITION_LINES = 4;

  if (nutritionStartIndex < 0 || nutritionStartIndex >= recipeLines.length) {
    // handle invalid input
    return [];
  }

  const nutritionLines = recipeLines
    .slice(nutritionStartIndex + 1, nutritionStartIndex + 1 + MAX_NUTRITION_LINES)
    .filter((line) => line.trim().length > 0);

  const nutritionRegex = /^-?\s*/;

  return nutritionLines.map((nutrition) => {
    const cleanedNutrition = nutrition.replace(nutritionRegex, "").trim();
    return cleanedNutrition;
  });
}

module.exports = extractRecipeNutrition;
