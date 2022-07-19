const express = require('express');
const app = express();
const port = 3999;

app.get('/', (req, res) => {
  res.send('Hello! This is an API demo. You can check it out at https://readme.nyc');
})

/* @oas [post] /message
 * description: "Update the sign"
 * parameters:
 * - (body) text {String} The text message you want to display
 * - (body) color {String} What color should the border be?
 */

app.post('/message', (req, res) => {
  res.send({ sent: true });
})

app.listen(port, () => {
  console.log(`Example app running at http://localhost:${port}`)
})
