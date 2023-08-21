const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import the dotenv package

const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;

// Load environment variables from .env file
dotenv.config();

// Fetch the MongoDB URL from the environment variables
const DB_URL = process.env.MONGODB_URL ;

(async () => {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");

    // Configure data parsing for incoming requests
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    // Set the view engine to use EJS templates
    app.set("view engine", "ejs");

    // Use the defined routes for handling requests
    app.use(routes);

    // Middleware for handling 404 errors
    app.use((req, res, next) => {
      res.status(404).send("404 Page not found");
    });

    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running at port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
})();
