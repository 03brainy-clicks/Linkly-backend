const express = require("express");
const router = express.Router();
const ShortUrl = require("../models/shortUrl.model");

// Create a short URL
router.post("/shorturl", async (req, res) => {
  try {
    const newShortUrl = await ShortUrl.create({ fullUrl: req.body.fullurl });
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to create short URL: " + error.message);
  }
});

// Display a list of short URLs
router.get("/", async (req, res) => {
  try {
    const shortUrls = await ShortUrl.find();
    res.render("index", { shortUrls: shortUrls.reverse() });
  } catch (error) {
    res.status(500).send("Failed to load URLs: " + error.message);
  }
});

// Delete an url
router.get("/delete/:url", async (req, res) => {
  try {
    const deletedUrl = await ShortUrl.findOneAndDelete({ shortUrl: req.params.url });
    
    if (deletedUrl) {
      console.log("Delete Successful");
    } else {
      console.log("URL not found");
    }
    
    res.redirect("/");
  } catch (error) {
    res.status(500).send("Failed to delete URL: " + error.message);
  }
});


// Redirect to the full URL when the short URL is accessed
router.get("/:shortUrl", async (req, res) => {
  try {
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl });

    if (!shortUrl) {
      return res.status(404).send("Short URL not found");
    }

    shortUrl.clicks++;
    await shortUrl.save();

    res.redirect(shortUrl.fullUrl);
  } catch (error) {
    res.status(500).send("Failed to find URL: " + error.message);
  }
});

module.exports = router;
