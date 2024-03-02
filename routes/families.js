var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.post("/", async function (req, res, next) {
  try {
    const user = req.body;
    const { nickname, adminUser } = user;
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

module.exports = router;
