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

router.post("/members", async function (req, res, next) {
  try {
    const body = req.body;
    const { familyId, adminUserId } = body;

    const tableName = `family_${familyId}_members`;

    await db(`CREATE TABLE ${tableName}(
      id BIGINT NOT NULL PRIMARY KEY,
      isAdminUser TINYINT(1) NOT NULL DEFAULT 0,
      isPrimaryGuardian TINYINT(1) NOT NULL DEFAULT 0,
      isExtendedGuardian TINYINT(1) NOT NULL DEFAULT 0,
      isFriendGuardian TINYINT(1) NOT NULL DEFAULT 0,
      isChild TINYINT(1) NOT NULL DEFAULT 0
  );
  INSERT INTO ${tableName}(id, isAdminUser) VALUES(${adminUserId}, 1);`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
