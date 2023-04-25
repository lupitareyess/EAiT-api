function extractRecipeInstructions(recipeLines, instructionsStartIndex, caloriesStartIndex) {
    return recipeLines
      .slice(instructionsStartIndex + 1, caloriesStartIndex)
      .filter((line) => line.trim().length > 0);
  }

  module.exports = extractRecipeInstructions;