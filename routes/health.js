var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.familyId;

    const results = await db(
      `SELECT * FROM familyDoctors WHERE family = ${id};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
