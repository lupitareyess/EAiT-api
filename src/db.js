const { Client } = require("pg");

const connectionString = "postgresql://ivanchew:kariya09@localhost:5432/eait";

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
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getProteinPork = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'pork';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getProteinSeafood = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'seafood';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getProteinVegetarian = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE subcategory = 'vegetarian';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllProteins = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'protein';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllVegetables = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'vegetables';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllFruits = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'fruits';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllDairy = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'dairy';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllSpices = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'spice_and_condiments';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };

  const getAllAlcohol = async () => {
    try {
      const result = await client.query("SELECT * FROM ingredients WHERE category = 'alcohol';");
      return result.rows;
    } catch (error) {
      console.error("Error fetching beef ingredients:", error);
      return [];
    }
  };
  
module.exports = {
    getUsers,
    getCookingTools,
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
  };

