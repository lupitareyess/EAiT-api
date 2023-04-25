function extractRecipeIngredients(recipeLines, ingredientsStartIndex, instructionsStartIndex) {
    return recipeLines
      .slice(ingredientsStartIndex + 1, instructionsStartIndex)
      .filter((line) => line.trim().length > 0)
      .map((ingredient) => ingredient.startsWith("- ") ? ingredient.substring(2) : ingredient);
  }

  module.exports = extractRecipeIngredients;