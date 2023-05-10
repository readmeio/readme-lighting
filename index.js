const express = require("express");
const app = express();
const port = parseInt(process.env.PORT || "3999", 10);

const readme = require("readmeio");

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const api = require("./api");

app.get("/", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.lighting/reference");
});

app.get("/login", (req, res) => {
  // Redirect users to the docs!
  res.redirect("https://docs.readme.lighting/login");
});

const createApiKey = (email) => {
  const hash = Buffer.from(email.trim()).toString("base64").replace(/=/g, "");
  return `rdme_lights_${hash}`;
};

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["readme-signature"];
  const secret = process.env.README_JWT;

  try {
    // Verify signature
    readme.verifyWebhook(req.body, signature, secret);
  } catch (e) {
    return res.sendStatus(401);
  }

  const apiKey = createApiKey(req.body.email);

  // Why did this only work with the keys array?
  // Why is id required? Is it required?
  // Should we do something better if name isn't passed in?
  return res.json({
    email: req.body.email,
    keys: [
      {
        apiKey,
        id: apiKey,
        name: req.body.email,
      },
    ],
  });
});

app.use("/api", api);

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});
