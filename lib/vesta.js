const wrap = require("word-wrap");

const rand = a => a[Math.floor(Math.random()*a.length)];

  const colors = (c) => {
    const map = {
      red: 63,
      orange: 64,
      yellow: 65,
      green: 66,
      blue: 67,
      violet: 68,
      black: 0,
      white: 69,
    };

    if (c === "rainbow") return rand(Object.keys(map));

    return map[c] || 63;
  };

  const colorsEmoji = (c) => {
    const map = {
      red: "🟥",
      orange: "🟧",
      yellow: "🟨",
      green: "🟩",
      blue: "🟦",
      violet: "🟪",
      black: "⬛️",
      white: "⬜️",
    };

    if (c === "rainbow") return rand(Object.keys(map));

    return map[c] || 63;
  };



module.exports = (color, text) => {
  let lines = wrap(text, { width: 22, indent: "" }).split(/\n/);

  const line = (new Array(22).fill(null).map(() => colors(color))).join('');

  const pad = (i) => "______________________".substr(0, i);

  const out = [];

  lines = lines.splice(0, 4);

  const padding = (4 - lines.length) / 2;
  for (var i = 0; i < Math.floor(padding); i++) {
    out.push("______________________");
  }

  lines.forEach((l) => {
    l = l.trim();
    const space = (22 - l.length) / 2;
    out.push(pad(Math.floor(space)) + l.toUpperCase() + pad(Math.ceil(space)));
  });

  for (var i = 0; i < Math.ceil(padding); i++) {
    out.push("______________________");
  }

  const characters = (c) => {
    const map = {
      _: 0,
      A: 1,
      B: 2,
      C: 3,
      D: 4,
      E: 5,
      F: 6,
      G: 7,
      H: 8,
      I: 9,
      J: 10,
      K: 11,
      L: 12,
      M: 13,
      N: 14,
      O: 15,
      P: 16,
      Q: 17,
      R: 18,
      S: 19,
      T: 20,
      U: 21,
      V: 22,
      W: 23,
      X: 24,
      Y: 25,
      Z: 26,
      1: 27,
      2: 28,
      3: 29,
      4: 30,
      5: 31,
      6: 32,
      7: 33,
      8: 34,
      9: 35,
      0: 36,
      "!": 37,
      "@": 38,
      "#": 39,
      $: 40,
      "(": 41,
      ")": 42,
      "-": 44,
      "+": 46,
      "&": 47,
      "=": 48,
      ";": 49,
      ":": 50,
      "'": 52,
      '"': 53,
      "%": 54,
      ",": 55,
      ".": 56,
      "/": 59,
      "?": 60,
      "°": 62,
    };

    if (!map[c]) return 0;
    return map[c];
  };

  function vesta() {
    const format = [];

    format.push(new Array(22).fill(null).map(() => colors(color)));

    out.forEach((l) => {
      format.push(l.split("").map(characters));
    });

    format.push(new Array(22).fill(null).map(() => colors(color)));
    return format;
  }

  function api() {
    const format = [];

    format.push(
      new Array(22)
        .fill(null)
        .map(() => colorsEmoji(color))
        .join("")
    );

    out.forEach((l) => {
      format.push(l.replace(/_/g, " "));
    });

    format.push(
      new Array(22)
        .fill(null)
        .map(() => colorsEmoji(color))
        .join("")
    );
    return format;
  }

  return { vesta, api };
};
