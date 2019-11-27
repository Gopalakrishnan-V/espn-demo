const express = require("express");
const bodyParser = require("body-parser");
const espn = require("espn-cricket-api");

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

app.get("/api/teams", async (req, res) => {
  const teams = await espn.getTeams();
  res.send({ data: teams });
});

app.get("/api/teams/:teamID/:teamSlug/players", async (req, res) => {
  const { teamID, teamSlug } = req.params;
  const teamPlayers = await espn.getTeamPlayers({ teamID, teamSlug });
  res.send({ data: teamPlayers });
});

app.get("/api/players/:playerID/:teamSlug", async (req, res) => {
  const { playerID, teamSlug } = req.params;
  const playerDetails = await espn.getPlayerDetails({ playerID, teamSlug });
  res.send({ data: playerDetails });
});

app.get("/api/search", async (req, res) => {
  let { q, limit } = req.query;
  limit = parseInt(limit);
  const searchResults = await espn.search({ query: q, limit });
  res.send({ data: searchResults });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server started listening on port ${PORT}`);
});
