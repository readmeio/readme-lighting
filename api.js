const express = require("express");
const router = express.Router();

const readme = require("readmeio");

const auth = require("./lib/auth");

const vesta = require('./lib/vesta');

const request = require('request');

require('dotenv').config();

router.use(auth);

router.use(
  readme.metrics(process.env.README_KEY, req => ({
    apiKey: req.user.apiKey,
    label: req.user.label,
    email: req.user.email,
  }), {
    // optional, enable in development mode
    //development: true,
  })
);

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
  // TODO: Actually change the Vestasboard!
  const v = vesta(req.body.color,req.body.text);

  console.log({ form: v.vesta() })
  request.post('https://rw.vestaboard.com/', { json: v.vesta(), headers: { 'X-Vestaboard-Read-Write-Key': process.env.VESTABOARD }}, (a, b, c) => {
    console.log(a, b, c);
    })

  res.send({result: v.api() });
});

module.exports = router;
