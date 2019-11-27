module.exports = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey && process.env.API_KEY === apiKey) {
    next();
  } else {
    return res.status(401).send({
      error: { code: 401, message: "Please provide a valid API key" }
    });
  }
};
