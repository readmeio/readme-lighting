const express = require("express");
const app = express();
const port = parseInt(process.env.PORT || "3999", 10);

const readme = require('readmeio');

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const api = require("./api");

app.get("/", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.nyc");
});

const createApiKey = (email) => {
  const hash = Buffer.from(email.trim()).toString('base64').replace(/=/g, '');
  return `rdme_nyc_${hash}`;
};

app.post('/webhook', express.raw({ type: 'application/json' }), (req, res) => {
  const signature = req.headers['readme-signature'];
  const secret = process.env.README_KEY;

  try {
    // Verify signature
    readme.verifyWebhook(req.body, signature, secret);
  } catch (e) {
    return res.sendStatus(401);
  }

  return res.json({
    apiKey: createApiKey(req.body.email),
  });
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
