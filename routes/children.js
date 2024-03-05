var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const { firstName, gender, dob, primaryFamily, familyAdminGuardian } = body;
    await db(`INSERT INTO children(firstName, gender, dob, primaryFamily, familyAdminGuardian)
    VALUES('${firstName}', '${gender}', '${dob}', '${primaryFamily}', '${familyAdminGuardian}');`);

    const results = await db(
      `SELECT * FROM children WHERE familyAdminGuardian = '${familyAdminGuardian}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.familyAdminGuardian;

    const results = await db(
      `SELECT * FROM children WHERE familyAdminGuardian = '${id}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
