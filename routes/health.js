var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.familyId;

    const results = await db(
      `SELECT clinicName, clinicEmail, clinicPhoneNo, streetAddress, city, websiteURL, d.id, firstName, lastName, languages, doctorType FROM clinics AS c INNER JOIN family_doctors AS d ON c.id = d.clinicId WHERE d.familyId = ${id};`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
