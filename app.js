const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, JS, images) from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up route for serving static HTML files from 'view' directory
app.use(express.static(path.join(__dirname, "view")));

const port = 3000;

// Route for the root path ("/"), rendering the balls.html page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "balls.html")); // Serve balls.html
});

// Route for the "/game" path, rendering the game.html page
app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "game.html")); // Serve game.html
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
