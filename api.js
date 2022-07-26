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
 * requestBody:
 *   description: Optional description in *Markdown*
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         required: [text, color]
 *         properties:
 *           text:
 *             type: string
 *             description: What text should be displayed?
 *           color:
 *             type: string
 *             enum: [red, orange, yellow, green, blue, violet]
 * tags:
 * - Messages
 * security:
 * - ApiKeyAuth: []
 */

router.post("/message", (req, res) => {
  if (!req.body.text) {
    return res.json(401, { 'error': 'Text is required' });
  }
  if (!req.body.color) {
    return res.json(401, { 'error': 'Color is required' });
  }

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

/* @oas [get] /owlfact
 * summary: Owl facts
 * description: Get a random, possibly true, owl fact
 * tags:
 * - Fun Facts
 * security:
 * - ApiKeyAuth: []
 */

router.get("/owlfact", (req, res) => {
  const owlFacts = [
    'Many owl species have asymmetrical ears, this lets them pinpoint prey in all directions.',
    'The tiniest owl, the Elf Owl, is only 5 inches tall.',
    'The Great Gray Owl is the largest in North America at up to 32 inches tall.',
    'The Hawk Owl can detect prey up to half a mile away.',
    'There are 200 owl species, not including internet species like Owlbert.',
    "Owls can turn their heads as much as 270 degrees. They're owlways watching you.",
    "Owls are farsighted—which is why they're often squinting to read when they forget their glasses.",
    'Owls live on all continents except Antarctica.',
    'A barn owl can eat up to 1,000 mice per year. Please guard your rodents closely.',
    'Female owls are larger, more aggressive, and more colorful than males.',
    'Baby owls are called owlets, baby Owlbert was called Bertlet.',
    'Fossilized owls have been found that are up to 58 million years old. Early primates had their own Owlberts!',
    'Owls have been found in cave paintings in France, Egyptian hieroglyphics, and Mayan art.',
    'A group of owls is called a parliament.',
    'Owls can rotate their necks 270 degrees.',
    'Owl eyes are completely immobile, providing binocular vision.',
    'Owls have three eyelids, for blinking, sleeping, and keeping clean.',
    'Owls have specialized feathers with fringes to help muffle sound when they fly.',
    'Not all owls hoot. Some make other sounds, such as screeches, and barks.',
    'Owls have been found in the fossil record up to 58 million years ago.',
    'The largest recorded owl fossil, Orinmegalonyx Oteroi, stood about three feet tall.',
    'Only 19 owl species are found in the United States.',
    'The fans on ThinkPads were inspired by the shape of owl feathers, to reduce fan noise.',
    'Owl feathers have notches and serrated edges that quiet their movement.',
    'Before learning to fly baby owls work on developing their muscles by going for a run.',
    "An owl's eye color indicates when it prefers to hunt.",
  ];

  res.json({ fact:  owlFacts[Math.floor(Math.random() * owlFacts.length)] });
});

module.exports = router;
