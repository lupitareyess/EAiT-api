function extractRecipeName(recipeLines) {
    return recipeLines.shift().replace(/\*Recipe Name:\* /, "");
  }

  module.exports = extractRecipeName;