function extractRecipeName(recipeLines) {
  const pattern = /(?:\*\s?Recipe Name:\*?\s?|\s?Recipe Name:\s?)(.*)/;
  const originalString = recipeLines.shift();
  const match = originalString.match(pattern);
  return match ? match[1] : originalString;
}

// Old code works ok

// function extractRecipeName(recipeLines) {
//   return recipeLines.shift().replace(/^\s*Recipe\s+Name\s*:\s*\s*/i && /^\*\s*Recipe\s+Name\s*:\s*\*\s*/i, "");
// }


module.exports = extractRecipeName;