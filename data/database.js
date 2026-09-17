const dotenv = require("dotenv");
dotenv.config();

const { MongoClient } = require("mongodb");

let database;

const initDB = async (callback) => {
  if (database) {
    console.log("Database is already initialized.");
    return callback(null, database);
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in the .env file.");
    }

    const client = new MongoClient(process.env.MONGODB_URI, {
      family: 4,
      serverSelectionTimeoutMS: 10000
    });

    await client.connect();

    database = client.db();

    console.log("Database connected successfully.");

    callback(null, database);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    callback(err);
  }
};

const getDatabase = () => {
  if (!database) {
    throw new Error("Database not initialized.");
  }

  return database;
};

module.exports = {
  initDB,
  getDatabase
};