var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.familyId;

    const results = await db(
      `SELECT schoolName, schoolEmail, schoolPhoneNo, streetAddress, city, websiteURL, t.id, firstName, lastName, mobileNo, email FROM schools AS s INNER JOIN teachers AS t ON s.id = t.schoolId WHERE t.familyId = ${id};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
