var express = require("express");
var router = express.Router();
const db = require("../model/helper");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    const user = req.body;
    user.phoneNumber = "00000";
    const { firstName, lastName, dob, email, password, phoneNumber } = user;
    await db(`INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob)
    VALUES('${firstName}','${lastName}','${email}','${password}','${phoneNumber}', '${dob}');`);

    const results = await db("SELECT * FROM users;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
