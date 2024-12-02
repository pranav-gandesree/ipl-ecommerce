const express = require("express")
const { AddTeam } = require("../controllers/teamController")

const router = express.Router();

router.post("/addteam", AddTeam);

module.exports = router;
