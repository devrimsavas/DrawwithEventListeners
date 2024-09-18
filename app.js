const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "view")));

const port = 3000;

app
  .get("/", (req, res) => {
    return res.status(200).json({
      message: "hello world",
    });
  })
  .listen(port, () => {
    console.log(`listening at port ${port}`);
  });
