var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    if (!req.query) {
      // GET ALL USERS
      results = await db("SELECT * FROM users;");
      res.send(results.data);
    }

    const { email, password } = req.query;

    let results;

    // CHECK FOR EXISTING USER
    if (!password) {
      results = await db(`SELECT * FROM users WHERE email = '${email}';`);
      if (results.data[0]) res.status(200).send(true);
      else res.send(false);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ADDS A NEW USER FROM SIGN-UP AND RETURNS THIS USER (RETURNS USER WITH HIGHEST ID (i.e. most recently added user))
router.post("/", async function (req, res, next) {
  try {
    const user = req.body;
    user.phoneNumber = "123456789";
    const {
      firstName,
      lastName,
      dob,
      email,
      password,
      phoneNumber,
      gender,
      sex,
      pronouns,
    } = user;
    await db(`INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob, sex, gender, pronouns)
    VALUES('${firstName}','${lastName}','${email}','${password}','${phoneNumber}', '${dob}','${sex}', '${gender}', '${pronouns}');`);

    const results = await db("SELECT * FROM users ORDER BY id DESC LIMIT 1;");
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
