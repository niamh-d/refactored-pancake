var express = require("express");
var router = express.Router();
const db = require("../model/helper");

router.get("/", async function (req, res, next) {
  try {
    const id = req.query.id;

    const results = await db(`SELECT * FROM families WHERE id = ${id};`);

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async function (req, res, next) {
  try {
    const body = req.body;
    const { familyName, adminUser } = body;
    await db(`INSERT INTO families(familyName, adminUser)
    VALUES('${familyName}','${adminUser}');`);

    const results = await db(
      "SELECT * FROM families ORDER BY id DESC LIMIT 1;"
    );

    res.send(results.data[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/members", async function (req, res, next) {
  try {
    const id = req.query.familyId;
    const tableName = `family_${id}_members`;

    results = await db(
      `SELECT id, firstName, lastName, email, dob, gender, pronouns, photoSource, adminFamily, isAdminUser, isPrimaryGuardian, isExtendedFamilyGuardian, isThirdPartyGuardian FROM users INNER JOIN ${tableName} ON users.id = ${tableName}.userId;`
    );

    res.send(results.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/members", async function (req, res, next) {
  try {
    const body = req.body;
    const { familyId, adminUserId, guardianId, role } = body;

    const tableName = `family_${familyId}_members`;

    if (!role) {
      await db(`CREATE TABLE ${tableName}(
      grp ENUM('adult', 'child') NOT NULL,
      userId MEDIUMINT NOT NULL,
      isAdminUser TINYINT(1) NOT NULL DEFAULT '0',
      isPrimaryGuardian TINYINT(1) NOT NULL DEFAULT '0',
      isExtendedFamilyGuardian TINYINT(1) NOT NULL DEFAULT '0',
      isThirdPartyGuardian TINYINT(1) NOT NULL DEFAULT '0',
      PRIMARY KEY (grp,userId)
  )ENGINE=MyISAM;
  INSERT INTO ${tableName}(grp, userId, isAdminUser, isPrimaryGuardian) VALUES("adult", ${adminUserId}, 1, 1);`);
      res.status(200).send({ message: "table created!" });
    } else {
      let roleGroup;
      if (role === "primary") roleGroup = "isPrimaryGuardian";
      if (role === "extended") roleGroup = "isExtendedFamilyGuardian";
      if (role === "third") roleGroup = "isThirdPartyGuardian";

      await db(
        `INSERT INTO ${tableName}(grp, userId, ${roleGroup}) VALUES("adult", ${guardianId}, 1);`
      );

      res.status(200).send({ id: familyId });
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/members", async function (req, res, next) {
  try {
    const { guardianId, familyId } = req.body;

    const tableName = `family_${familyId}_members`;

    await db(`DELETE FROM ${tableName} WHERE userId = ${guardianId};`);

    await db(`UPDATE users SET family = NULL WHERE id = '${guardianId}';`);

    res.send({ message: "Guardian deleted successfully!" });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;

//OLD ENDPOINT NOT USING JOIN

// router.get("/members", async function (req, res, next) {
//   try {
//     const id = req.query.familyId;
//     const tableName = `family_${id}_members`;

//     const guardianIdResults = await db(
//       `SELECT userId FROM ${tableName} WHERE grp = "adult";`
//     );

//     const guardianIds = guardianIdResults.data.map(
//       (guardian) => guardian.userId
//     );

//     const searchStr = guardianIds
//       .map((id, i, arr) => `id = ${id} ${i !== arr.length - 1 ? "OR" : ""}`)
//       .join(" ");

//     const members = await db(`SELECT * FROM users WHERE ${searchStr};`);

//     res.send(members.data);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// });
