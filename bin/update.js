const vesta = require("../lib/vesta");

const request = require("request");

const colors = ["blue"];

const phrases = [
  "Hello apidays NYC!",
  "Hello New York City!",
  "Post a message here!",
  "Happy Friday Lite, y'all!",
  "Concrete jungle where dreams are made of",
  "If you're looking for a sign to talk to us, here it is",
];

/**
 * Function to randomly refresh the board
 */

function update() {
  console.log("running scheduled board update");
  const color = colors[Math.floor(Math.random() * colors.length)];
  const phrase = phrases[Math.floor(Math.random() * phrases.length)];
  const v = vesta(color, `${phrase} https://readme.nyc`);

  request.post(
    "https://rw.vestaboard.com/",
    {
      json: v.vesta(),
      headers: { "X-Vestaboard-Read-Write-Key": process.env.VESTABOARD },
    },
    function (error, response, body) {
      if (error) console.log("error posting update:", error);
      else if (response && response.statusCode)
        console.log(
          "received the following status code when making update:",
          response.statusCode
        );
    }
  );
}

update();
