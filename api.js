const express = require("express");
const router = express.Router();

const readme = require("readmeio");

const auth = require("./lib/auth");

const request = require("request");

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

/* @oas [get] /themes
 * summary: Get the list of available themes
 * description: This will return all available themes for the lights
 * tags:
 * - Lights
 * security:
 * - ApiKeyAuth: []
 */
router.get('/themes', (req, res) => {
  request.get('https://apimixtape.ngrok.io/api/themes', (err, response, body) => {
    res.status(response.statusCode).json(JSON.parse(body));
  });
});

/* @oas [get] /themes/{name}
 * summary: Return details for specific theme
 * description: This will return the settings for a provided theme
 * parameters:
 *  - name: name
    in: path
    required: true
    schema:
      type: string
 * tags:
 * - Lights
 * security:
 * - ApiKeyAuth: []
 */
router.get('/themes/:name', (req, res) => {
  request.get(`https://apimixtape.ngrok.io/api/themes/${req.params.name}`, (err, response, body) => {
    console.log(response.statusCode)
    res.status(response.statusCode).json(JSON.parse(body));
  });
});

/* @oas [post] /themes
 * summary: Change the theme
 * description: This will update the lights to the provided theme
 * requestBody:
 *   description: Optional description in *Markdown*
 *   required: true
 *   content:
 *     application/json:
 *       schema:
 *         type: object
 *         required: [theme]
 *         properties:
 *           theme:
 *             type: string
 *             default: colorful
 *             description: What theme should be displayed?
 *             enum: [colorful, blue, america, christmas, facebook, fire, gitlab, lyft, mixtape, office, pastel, readme, scale, segment, slack, spring, warriors]
 * tags:
 * - Lights
 * security:
 * - ApiKeyAuth: []
 */
router.post('/themes', (req, res) => {
  if (req.body.theme === "blurple") {
    return res.status(404).json({
      error: "This is not a valid theme",
      docs: "https://docs.readme.lighting/reference/post_themes?shareId=75eUyijgaLYhufv9YFwT"
    });
  }

  let theme = req.body.theme;
  if (!theme) {
    theme = 'colorful';
  }

  request.post("https://apimixtape.ngrok.io/api/change", {
    json: {
      theme,
    }
  }, (err, response, body) => {
    res.status(response.statusCode).json(body);
  });
})

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
    "Many owl species have asymmetrical ears, this lets them pinpoint prey in all directions.",
    "The tiniest owl, the Elf Owl, is only 5 inches tall.",
    "The Great Gray Owl is the largest in North America at up to 32 inches tall.",
    "The Hawk Owl can detect prey up to half a mile away.",
    "There are 200 owl species, not including internet species like Owlbert.",
    "Owls can turn their heads as much as 270 degrees. They're owlways watching you.",
    "Owls are farsighted—which is why they're often squinting to read when they forget their glasses.",
    "Owls live on all continents except Antarctica.",
    "A barn owl can eat up to 1,000 mice per year. Please guard your rodents closely.",
    "Female owls are larger, more aggressive, and more colorful than males.",
    "Baby owls are called owlets, baby Owlbert was called Bertlet.",
    "Fossilized owls have been found that are up to 58 million years old. Early primates had their own Owlberts!",
    "Owls have been found in cave paintings in France, Egyptian hieroglyphics, and Mayan art.",
    "A group of owls is called a parliament.",
    "Owls can rotate their necks 270 degrees.",
    "Owl eyes are completely immobile, providing binocular vision.",
    "Owls have three eyelids, for blinking, sleeping, and keeping clean.",
    "Owls have specialized feathers with fringes to help muffle sound when they fly.",
    "Not all owls hoot. Some make other sounds, such as screeches, and barks.",
    "Owls have been found in the fossil record up to 58 million years ago.",
    "The largest recorded owl fossil, Orinmegalonyx Oteroi, stood about three feet tall.",
    "Only 19 owl species are found in the United States.",
    "The fans on ThinkPads were inspired by the shape of owl feathers, to reduce fan noise.",
    "Owl feathers have notches and serrated edges that quiet their movement.",
    "Before learning to fly baby owls work on developing their muscles by going for a run.",
    "An owl's eye color indicates when it prefers to hunt.",
  ];

  res.json({ fact: owlFacts[Math.floor(Math.random() * owlFacts.length)] });
});

module.exports = router;
