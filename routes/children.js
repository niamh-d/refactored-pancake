var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const { firstName, primaryGuardian, primaryFamily } = body;
    await db(`INSERT INTO children(firstName, primaryGuardian, primaryFamily)
    VALUES('${firstName}','${primaryGuardian}','${primaryFamily}');`);

    const results = await db(
      `SELECT * FROM children WHERE primaryGuardian = '${primaryGuardian}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.primaryGuardian;

    const results = await db(
      `SELECT * FROM children WHERE primaryGuardian = '${id}';`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
