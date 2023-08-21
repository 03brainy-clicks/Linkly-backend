const mongoose = require("mongoose");
const shortid = require("shortid");

// Define the schema for the Short URL
const shortUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true, // Corrected "require" to "required"
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate, // Generate a unique short ID
  },
  clicks: {
    type: Number,
    required: true,
    default: 0, // Default click count is 0
  },
});

// Check if the model already exists, otherwise create it
const urlModel = mongoose.models.shortUrl || mongoose.model("shortUrl", shortUrlSchema);

module.exports = urlModel;
