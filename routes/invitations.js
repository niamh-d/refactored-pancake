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
    const {
      invitorFamily,
      invitorFamilyName,
      invitee,
      inviteeName,
      invitor,
      invitorName,
      inviteeRole,
    } = req.body;

    await db(`INSERT INTO invitations(invitor, invitorName, invitorFamily, invitorFamilyName, invitee, inviteeName, inviteeRole)
    VALUES('${invitor}', '${invitorName}', '${invitorFamily}', '${invitorFamilyName}','${invitee}', '${inviteeName}', '${inviteeRole}');`);

    res.send({ message: "Invitation inputted sucecssfully!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/", async function (req, res, next) {
  try {
    const { inviteId, userId } = req.body;

    await db(`DELETE FROM invitations WHERE id = ${inviteId};`);

    const results = await db(
      `SELECT * FROM invitations WHERE invitee = ${userId} OR invitor = ${userId};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
