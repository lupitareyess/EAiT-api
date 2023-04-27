function extractCookingTime(recipeLines, cookingTimeStartIndex) {
  if (cookingTimeStartIndex < 0 || cookingTimeStartIndex >= recipeLines.length) {
    // handle invalid input
    return "Not specified";
  }

  const cookingTimeLine = recipeLines[cookingTimeStartIndex];
  const prefixRegex = /^(\*?\s*Cooking\s+Time\s*:?\s*\*?)|(.*Cooking\s+Time.*)/i;

  if (!prefixRegex.test(cookingTimeLine)) {
    // handle missing or incorrect cooking time prefix
    return cookingTimeLine.trim();
  }

  const cookingTime = cookingTimeLine.replace(prefixRegex, "").trim();
  return cookingTime;
}

module.exports = extractCookingTime;

