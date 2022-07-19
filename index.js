const express = require("express");
const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const auth = require('./lib/auth');

app.get("/", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.nyc");
});

/* @oas [post] /message
 * summary: Update the sign message
 * description: This will send a message to the Vestaboard to be displayed
 * parameters:
 * - (body) text {String} The text message you want to display
 * - (body) color {String} What color should the border be?
 * tags:
 * - Messages
 * security:
 * - ApiKeyAuth: []
 */

app.post("/api/message", auth, (req, res) => {
  // TODO: Actually change the Vestasboard!
  res.send({ text: req.body.text, color: req.body.color });
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
