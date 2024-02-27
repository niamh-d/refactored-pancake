var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    let results;

    if (!req.query) {
      // GET ALL USERS
      results = await db("SELECT * FROM users;");
      res.send(results.data);
    }

    const { email, password } = req.query;

    // CHECK FOR EXISTING USER (UPON SET-UP)
    if (!password) {
      results = await db(`SELECT * FROM users WHERE email = '${email}';`);
      res.status(200).send(results.data);
    } else {
      //LOGIN
      results = await db(
        `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`
      );
      res.status(200).send(results.data);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// ADDS A NEW USER FROM SIGN-UP AND RETURNS THIS USER (RETURNS USER WITH HIGHEST ID (i.e. most recently added user))
router.post("/", async function (req, res, next) {
  try {
    const user = req.body;
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
