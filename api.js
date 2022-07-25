const express = require("express");
const router = express.Router();

const readme = require("readmeio");

const auth = require("./lib/auth");

const vesta = require("./lib/vesta");

const request = require("request");

let current;

require("dotenv").config();

router.use(auth);

router.use(
  readme.metrics(
    process.env.README_KEY,
    (req) => ({
      apiKey: req.user.apiKey,
      label: req.user.label,
      email: req.user.email,
    }),
    {
      // optional, enable in development mode
      //development: true,
    }
  )
);

/* @oas [get] /message
 * summary: Get the current message
 * description: This will return the current message
 * tags:
 * - Messages
 * security:
 * - ApiKeyAuth: []
 */

router.get("/message", (req, res) => {
  res.json({ result: current });
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

router.post("/message", (req, res) => {
  const v = vesta(req.body.color, req.body.text);

  current = v.api();

  request.post("https://rw.vestaboard.com/", {
    json: v.vesta(),
    headers: { "X-Vestaboard-Read-Write-Key": process.env.VESTABOARD },
  });
  res.json({ result: v.api() });
});

/* @oas [delete] /message
 * summary: Reset sign message
 * description: This will reset the Vestaboard's message
 * tags:
 * - Messages
 * security:
 * - ApiKeyAuth: []
 */

router.delete("/message", (req, res) => {
  const v = vesta('blue', 'Post a message here! https://readme.nyc');

  request.post("https://rw.vestaboard.com/", {
    json: v.vesta(),
    headers: { "X-Vestaboard-Read-Write-Key": process.env.VESTABOARD },
  });
  res.json({ result: v.api() });
});

module.exports = router;
