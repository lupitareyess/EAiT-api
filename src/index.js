const axios = require("axios");
const middleware = require('./middleware');
const recipeRoutes = require('./routes/recipe');
const cookingToolsRoutes = require('./routes/cookingTools');
const ingredientsRoutes = require('./routes/ingredients');
const generateRecipeRoutes = require('./routes/generateRecipe');

const port = process.env.PORT || 3001;

const recipeStore = {};

function createApp(recipeStore) {
  const app = middleware();

  app.use(recipeRoutes(recipeStore));
  app.use(cookingToolsRoutes);
  app.use(ingredientsRoutes);
  app.use(generateRecipeRoutes(recipeStore));

  return app;
}

const app = createApp(recipeStore);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
