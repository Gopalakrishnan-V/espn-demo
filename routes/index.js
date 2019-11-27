const express = require("express");
const espn = require("espn-cricket-api");
const router = express.Router();
const cache = require("../utils/cacheInstance");

router.get("/api/teams", async (req, res) => {
  const teams = await espn.getTeams();
  cache.set(req.url, { data: teams });
  res.send({ data: teams, source: "api" });
});

router.get("/api/teams/:teamID/:teamSlug/players", async (req, res) => {
  const { teamID, teamSlug } = req.params;
  const teamPlayers = await espn.getTeamPlayers({ teamID, teamSlug });
  cache.set(req.url, { data: teamPlayers });
  res.send({ data: teamPlayers, source: "api" });
});

router.get("/api/players/:playerID/:teamSlug", async (req, res) => {
  const { playerID, teamSlug } = req.params;
  const playerDetails = await espn.getPlayerDetails({ playerID, teamSlug });
  cache.set(req.url, { data: playerDetails });
  res.send({ data: playerDetails, source: "api" });
});

router.get("/api/search", async (req, res) => {
  let { q, limit } = req.query;
  limit = parseInt(limit);
  const searchResults = await espn.search({ query: q, limit });
  cache.set(req.url, { data: searchResults });
  res.send({ data: searchResults, source: "api" });
});

module.exports = router;
