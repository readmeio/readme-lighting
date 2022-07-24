module.exports = (req, res, next) => {
  if (!req.headers['x-api-key']) {
    return res.json(401, { 'error': 'no api key' });
  }

  req.user = {
    apiKey: req.headers['x-api-key'],
    label: 'gkoberger@gmail.com',
    email: 'gkoberger@gmail.com',
  };

  next();
};
