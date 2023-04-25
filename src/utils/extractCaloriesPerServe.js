function extractCaloriesPerServe(recipeLines, caloriesStartIndex) {
  return caloriesStartIndex >= 0 ? recipeLines[caloriesStartIndex].replace(/\*Calories per serve:\* /, "") : "Not specified";
}


module.exports = extractCaloriesPerServe;