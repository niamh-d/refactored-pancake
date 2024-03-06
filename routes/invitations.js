var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    const user = req.query.loggedInUser;

    const results = await db(
      `SELECT * FROM invitations WHERE invitee = ${user} OR invitor = ${user};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const { invitorFamily, invitee, invitor, inviteeRole } = req.body;

    await db(`INSERT INTO invitations(invitorFamily, invitor, invitee, inviteeRole)
      VALUES('${invitorFamily}','${invitor}', '${invitee}', '${inviteeRole}');`);

    const results = await db(
      `SELECT * FROM invitations WHERE invitee = ${user} OR invitor = ${user};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
