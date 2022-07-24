const express = require("express");
const app = express();
const port = parseInt(process.env.PORT || "3999", 10);

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const api = require("./api");

app.get("/", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.nyc");
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
