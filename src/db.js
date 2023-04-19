const { Client } = require("pg");
require('dotenv').config();

const connectionString = process.env.CONNECTION_STRING;

const client = new Client({
  connectionString: connectionString,
});

// Connect to the database
client.connect();

const getAllIngredients = async () => {
    try {
      const res = await client.query('SELECT * FROM ingredients');
      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

const getCookingTools = async () => {
    try {
      const res = await client.query('SELECT * FROM cooking_tools');
      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

const getUsers = async () => {
    try {
      const res = await client.query('SELECT * FROM users');
      return res.rows;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const getAllProteins = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'protein';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllVegetables = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'vegetables';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllFruits = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'fruits';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllDairy = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'dairy';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllSpices = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'spice_and_condiments';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllAlcohol = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'alcohol';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllCategories = async () => {
    try {
      const result = await client.query("SELECT DISTINCT category FROM ingredients");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllProteinsSubCategories = async () => {
    try {
      const result = await client.query(`SELECT DISTINCT subcategory FROM ingredients WHERE category = 'protein'`);
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllVegetablesSubCategories = async () => {
    try {
      const result = await client.query(`SELECT DISTINCT subcategory FROM ingredients WHERE category = 'vegetables'`);
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };
  
  const getAllFruitsSubCategories = async () => {
    try {
      const result = await client.query(`SELECT DISTINCT subcategory FROM ingredients WHERE category = 'fruits'`);
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllDairySubCategories = async () => {
    try {
      const result = await client.query(`SELECT DISTINCT subcategory FROM ingredients WHERE category = 'dairy'`);
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getAllSpicesSubCategories = async () => {
    try {
      const result = await client.query(`SELECT DISTINCT subcategory FROM ingredients WHERE category = 'spice_and_condiments'`);
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getProteinPoultry = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'poultry';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching poultry ingredients:", error);
      return [];
    }
  };

const getProteinBeef = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'beef';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getProteinPork = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'pork';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getProteinSeafood = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'seafood';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getProteinVegetarian = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'vegetarian';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesRootsBulbs = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'roots_and_bulbs';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesLegumes = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'legumes';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesCabbages = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'cabbages';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesFruitVeggies = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'fruit_vegetables';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesCommonFruits = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'common_fruits';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getVegetablesTropicalFruits = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'citrus_tropical';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getDairyMilkCream = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'milk_and_cream';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getDairyButterYogurts = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'butters_and_yogurts';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getDairyCheeses = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'cheeses';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getDairyLactoseFree = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'lactose_free';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceCondimentsOils = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'oils';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceCondimentsSpices = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'spices';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceCondimentsAromatics = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'aromatics';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceCondimentsBaking = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'baking_essentials';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceCondiments = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'condiments';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

  const getSpiceBlends = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'spice_blends';");
      return result.rows;
    } catch (error) {
      console.error(err);
      return [];
    }
  };

module.exports = {
    getUsers,
    getCookingTools,
    getAllCategories,
    getAllProteinsSubCategories,
    getAllVegetablesSubCategories,
    getAllFruitsSubCategories,
    getAllDairySubCategories,
    getAllSpicesSubCategories,
    getAllIngredients,
    getAllProteins,
    getAllVegetables,
    getAllFruits,
    getAllDairy,
    getAllSpices,
    getAllAlcohol,
    getProteinPoultry,
    getProteinBeef,
    getProteinPork,
    getProteinSeafood,
    getProteinVegetarian,
    getVegetablesRootsBulbs,
    getVegetablesLegumes,
    getVegetablesCabbages,
    getVegetablesFruitVeggies,
    getVegetablesCommonFruits,
    getVegetablesTropicalFruits,
    getDairyMilkCream,
    getDairyButterYogurts,
    getDairyCheeses,
    getDairyLactoseFree,
    getSpiceCondimentsOils,
    getSpiceCondimentsSpices,
    getSpiceCondimentsAromatics,
    getSpiceCondimentsBaking,
    getSpiceCondiments,
    getSpiceBlends
  };

