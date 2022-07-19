const express = require("express");
const app = express();
const port = 3999;

app.get("/", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.nyc");
});

/* @oas [post] /message
 * description: Update the sign
 * parameters:
 * - (body) text {String} The text message you want to display
 * - (body) color {String} What color should the border be?
 */

app.post("/message", (req, res) => {
  // TODO: Change the Vestasboard!
  res.send({ text: req.body.text, color: req.body.color });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
