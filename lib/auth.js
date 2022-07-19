module.exports = (req, res, next) => {
  if (!req.headers['X-API-Key']) {
    return res.json(401, { 'error': 'no api key' });
  }

  next();
};
