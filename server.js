const express = require("express");
const bodyParser = require("body-parser");
const espn = require("espn-cricket-api");

const cacheInstance = require("./utils/cacheInstance");
const authMiddleware = require("./middlewares/auth.middleware");
const cacheMiddleware = require("./middlewares/cache.middleware");
const router = require("./routes/index");

espn.init();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  next();
});

app.get("/api/hello", async (req, res) => {
  res.send({ message: "hello" });
});

app.use(authMiddleware);
app.use(cacheMiddleware);
app.use(router);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
