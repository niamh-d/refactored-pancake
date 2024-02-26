var express = require("express");
var router = express.Router();
const db = require("../model/helper");

// GET ALL USERS
router.get("/", async function (req, res, next) {
  try {
    const results = await db("SELECT * FROM users;");
    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// GET USER BY CRITERIA
// router.get("/", function (req, res, next) {
//   try {
// const {email, password} = req.params;
//   } catch(err) {
//     res.status(500).send(err.message);
//   }
// });

// ADDS A NEW USER FROM SIGN-UP AND RETURNS THIS USER (RETURNS USER WITH HIGHEST ID (i.e. most recently added user))
router.post("/", async function (req, res, next) {
  try {
    const user = req.body;
    user.phoneNumber = "123456789";
    const { firstName, lastName, dob, email, password, phoneNumber } = user;
    await db(`INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob)
    VALUES('${firstName}','${lastName}','${email}','${password}','${phoneNumber}', '${dob}');`);

    const results = await db("SELECT * FROM users ORDER BY id DESC LIMIT 1;");
    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
