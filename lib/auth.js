module.exports = (req, res, next) => {
  if (!req.headers['x-api-key']) {
    return res.json(401, { 'error': 'no api key' });
  }

  next();
};
