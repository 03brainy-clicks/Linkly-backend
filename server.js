const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const routes = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URL = "mongodb://127.0.0.1:27017/urls";

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
