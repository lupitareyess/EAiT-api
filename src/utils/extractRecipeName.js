function extractRecipeName(recipeLines) {
  return recipeLines.shift().replace(/^\s*Recipe\s+Name\s*:\s*\s*/i && /^\*\s*Recipe\s+Name\s*:\s*\*\s*/i, "");
}

module.exports = extractRecipeName;