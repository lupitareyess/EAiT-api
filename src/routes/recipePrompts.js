function recipePromptOne({ skillLevel, mealType, numberOfServings, cookingTime, ingredients, selectedAllergies, gourmetModeCondition, strictModeCondition }) {
    return `Please provide a ${skillLevel} ${mealType} recipe that meets the following criteria:
    - Serves: ${numberOfServings} people
    - Cooking time: around ${cookingTime} minutes (mandatory)
    - Ingredients: ${ingredients}
    - Allergies: ${selectedAllergies}
    
    ${gourmetModeCondition}${strictModeCondition}
    
    Please format the response as follows and ensure to include cooking time and detailed nutrition information per serve:
    
    *Recipe Name:* {Recipe Name}
    *Ingredients:*
    {Ingredient 1}
    {Ingredient 2}
    ...
    *Instructions:*
    {Step 1}
    {Step 2}
    ...
    *Calories per serve:* {Calories}
    *Cooking Time:* {Cooking Time}
    *Nutrition Information (per serving):*
    - Calories: {Calories}
    - Protein: {Protein in grams}
    - Fat: {Fat in grams}
    - Sugars: {Sugars in grams}
    - Sodium: {Sodium in milligrams}`;
}


function recipePromptTwo({ skillLevel, mealType, numberOfServings, cookingTime, ingredients, selectedAllergies, selectedTools, gourmetModeCondition, strictModeCondition }) {
    return `Please provide a COMPLETELY different recipe from the first requested recipe. It should be an ${skillLevel} ${mealType} recipe that meets the following criteria:
    - Serves: ${numberOfServings} people
    - Cooking time: around ${cookingTime} minutes (mandatory)
    - Ingredients: ${ingredients.join(", ")}
    - Allergies: ${selectedAllergies.join(", ")}
    - Tools: ${selectedTools.join(", ")}
    
    ${gourmetModeCondition}${strictModeCondition}
    
    Please format the response as follows and ensure to include cooking time and detailed nutrition information per serve:
    
    *Recipe Name:* {Recipe Name}
    *Ingredients:*
    {Ingredient 1}
    {Ingredient 2}
    ...
    *Instructions:*
    {Step 1}
    {Step 2}
    ...
    *Calories per serve:* {Calories}
    *Cooking Time:* {Cooking Time}
    *Nutrition Information (per serving):*
    - Calories: {Calories}
    - Protein: {Protein in grams}
    - Fat: {Fat in grams}
    - Sugars: {Sugars in grams} 
    - Sodium: {Sodium in milligrams}`;
}

module.exports = {recipePromptOne, recipePromptTwo};