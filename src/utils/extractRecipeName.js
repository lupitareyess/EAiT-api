function extractRecipeName(recipeLines) {
  if (!Array.isArray(recipeLines) || recipeLines.length === 0) {
    // handle invalid input
    return "";
  }

  const recipeNameLine = recipeLines[0];
  const prefixRegex = /^\*\s*Recipe\s+Name\s*:\s*\*\s*/i;

  if (!prefixRegex.test(recipeNameLine)) {
    // handle missing or incorrect recipe name prefix
    return "";
  }

  const recipeName = recipeNameLine.replace(prefixRegex, "").trim();
  return recipeName;
}

module.exports = extractRecipeName;