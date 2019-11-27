const cache = require("../utils/cacheInstance");

module.exports = (req, res, next) => {
  const { url } = req;
  const cachedValue = cache.get(url);
  if (cachedValue) {
    return res.send({ ...cachedValue, source: "cache" });
  }
  next();
};
