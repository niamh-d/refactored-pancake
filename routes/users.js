var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.put("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const details = req.body;
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
      adminFamily,
    } = details;
    await db(
      `UPDATE users SET firstName = '${firstName}', lastName = '${lastName}', dob = '${dob}', sex = '${sex}', gender = '${gender}', pronouns = '${pronouns}'  WHERE id = '${id}'`
    );
    if (adminFamily)
      await db(
        `UPDATE users SET adminFamily = '${adminFamily}' WHERE id = '${id}';`
      );
    const results = await db(`SELECT * FROM users WHERE id = '${id}';`);
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET ALL USERS
router.get("/", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM users;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CHECK FOR EXISTING USER (UPON SET-UP)
router.get("/signup", async function (req, res, next) {
  const { email } = req.query;
  try {
    const results = await db(`SELECT * FROM users WHERE email = '${email}';`);
    console.log(results.data);
    res.status(200).send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// CHECK FOR USER WITH PROVIDED EMAIL AND PASSWORD AT LOGIN
router.get("/login", async function (req, res, next) {
  try {
    const { email, password } = req.query;
    const results = await db(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${password}';`
    );
    res.status(200).send(results.data);
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
