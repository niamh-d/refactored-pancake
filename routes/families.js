var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const { nickname, adminUser } = body;
    await db(`INSERT INTO families(nickname, adminUser)
    VALUES('${nickname}','${adminUser}');`);

    const results = await db(
      "SELECT * FROM families ORDER BY id DESC LIMIT 1;"
    );

    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const adminUser = req.query.adminUser;

    const results = await db(
      `SELECT * FROM families WHERE adminUser = ${adminUser};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
