module.exports = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.json(401, { 'error': 'No API key', 'suggestion': 'Log in at readme.nyc to get an API key!' });
  }

  if (!apiKey.match(/rdme_nyc_/)) {
    return res.json(401, { 'error': 'Invalid API key', 'suggestion': 'Log in at readme.nyc to get an API key!' });
  }

  const email = Buffer.from(apiKey.replace(/rdme_nyc_/, ''), 'base64').toString('ascii');

  req.user = {
    apiKey,
    label: email,
    email,
  };

  next();
};
