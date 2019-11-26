const express = require("express");
const bodyParser = require("body-parser");
const espn = require("./espn");

espn.init({ headless: false, devtools: false });

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

app.get("/api/teams", async (req, res) => {
  const teams = await espn.getTeams();
  res.send({ data: teams });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
