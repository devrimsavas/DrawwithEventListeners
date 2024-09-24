const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser

// Serve static files (CSS, JS, images) from 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Set up route for serving static HTML files from 'view' directory
app.use(express.static(path.join(__dirname, "view")));

const port = 3000;

// Route for the root path ("/"), rendering the balls.html page
app.get("/", (req, res) => {
  // Check if the visitor has a cookie
  console.log("hello");
  if (!req.cookies.visitorId) {
    const visitorId = Math.random().toString(36).substring(7);
    res.cookie("visitorId", visitorId, {
      maxAge: 900000,
      httpOnly: true,
      secure: false,
    });
    console.log(`New visitor assigned ID: ${visitorId}`);

    // Visitor data to be saved
    const visitorData = {
      id: visitorId,
      date: new Date().toISOString(),
    };

    // Use path to reference the correct file location
    const visitorsFilePath = path.join(__dirname, "visitors.json");

    // Append visitor data to 'visitors.json'
    fs.readFile(visitorsFilePath, "utf8", (err, data) => {
      let visitors = [];
      if (!err && data) {
        visitors = JSON.parse(data); // Parse existing data
      }
      visitors.push(visitorData); // Add new visitor

      // Write updated data back to the file
      fs.writeFile(
        visitorsFilePath,
        JSON.stringify(visitors, null, 2), // Pretty-print JSON with 2 spaces
        (err) => {
          if (err) {
            console.error("Error writing to visitors.json", err);
          } else {
            console.log("Visitor data saved to visitors.json");
          }
        }
      );
    });
  }

  // Serve the balls.html file
  res.sendFile(path.join(__dirname, "view", "index.html"));
});

// Route for the "/game" path, rendering the game.html page
app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "game.html")); // Serve game.html
});

app.get("/visitors", (req, res) => {
  const filePath = path.join(__dirname, "visitors.json"); // Absolute path to test.json

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
      return;
    }

    // If no error, send the file content
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  });
});
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at port ${port}`);
});
