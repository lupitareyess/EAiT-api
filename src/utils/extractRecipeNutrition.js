function extractRecipeNutrition(recipeLines, nutritionStartIndex) {
    return recipeLines
      .slice(nutritionStartIndex + 1, nutritionStartIndex + 1 + 4)
      .filter((line) => line.trim().length > 0)
      .map((nutrition) => nutrition.startsWith("- ") ? nutrition.substring(2) : nutrition.trim());
  }

  module.exports = extractRecipeNutrition;