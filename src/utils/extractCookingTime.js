function extractCookingTime(recipeLines, cookingTimeStartIndex) {
    return cookingTimeStartIndex >= 0
      ? (recipeLines[cookingTimeStartIndex].includes("*Cooking Time:*")
        ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
        : (recipeLines[cookingTimeStartIndex].includes("Cooking Time:")
          ? recipeLines[cookingTimeStartIndex].replace("Cooking Time:", "")
          : recipeLines[cookingTimeStartIndex]))
      : "Not specified";
  }

  module.exports = extractCookingTime;