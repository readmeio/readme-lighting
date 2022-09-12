const blockList = [];

module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (!apiKey) {
    return res.status(401).json({
      error: "No API key",
      suggestion: "Log in at readme.nyc/login to get an API key!",
    });
  }

  if (!apiKey.match(/rdme_nyc_/)) {
    return res.status(401).json({
      error: "Invalid API key",
      suggestion: "Log in at readme.nyc/login to get an API key!",
    });
  }

  const email = Buffer.from(apiKey.replace(/rdme_nyc_/, ""), "base64").toString(
    "ascii"
  );

  if (blockList.includes(email)) {
    return res.status(429).json({
      error: "Too many requests",
      suggestion: "How about you come say hello in person :~)",
    });
  }

  req.user = {
    apiKey,
    label: email,
    email,
  };

  next();
};
