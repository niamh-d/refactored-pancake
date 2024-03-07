SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists families;
DROP TABLE if exists children;
DROP TABLE if exists schools;
DROP TABLE if exists teachers;
DROP TABLE if exists familyDoctors;
DROP TABLE if exists invitations;
DROP TABLE if exists family_20022_members;
DROP TABLE if exists family_20023_members;
DROP TABLE if exists family_20024_members;
DROP TABLE if exists family_20025_members;
DROP TABLE if exists family_20026_members;
DROP TABLE if exists family_20027_members;
DROP TABLE if exists family_20028_members;
SET foreign_key_checks = 1;

CREATE TABLE `users`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(30) NOT NULL,
    `lastName` VARCHAR(30) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(30) NOT NULL,
    `dob` CHAR(10) NOT NULL,
    `sex` ENUM('0', '1') NOT NULL DEFAULT '0',
    `gender` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `pronouns` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `photoSource` VARCHAR(30) NULL,
    `adminFamily` MEDIUMINT DEFAULT NULL,
    `family` MEDIUMINT DEFAULT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10011;

INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob, sex, gender, pronouns, photoSource, adminFamily, family)
VALUES
    ('Sofie', 'Stephens', 'sofie@email.com', 'qwerty', '123456789',  '1988-01-20', '1', '1', '1', 'stephens-sofie', 20022, 20022),
    ('Claus', 'Weismann', 'claus@email.com', 'qwerty', '123456789', '1987-02-12', '0', '0', '0', 'weismann-claus', 20023, 20023),
    ('Gale', 'Vasquez', 'gale@email.com', 'qwerty', '123456789', '1990-01-23', '1', '2', '2', 'vasquez-gale', null, null),
    ('Milan', 'Zukal', 'milan@email.com', 'qwerty', '123456789', '1988-04-29', '0', '0', '0', 'zukal-milan', null, 20022),
    ('Sebastian', 'Kruse', 'seb@email.com', 'qwerty', '123456789', '1988-07-23', '0', '2', '2', 'kruse-seb', null, null),
    ('Tiiu', 'Tamm', 'tiiu@email.com', 'qwerty', '123456789', '1987-10-25', '1', '1', '1', 'tamm-tiiu', null, null),
    ('Sara', 'Fitzpatrick', 'sara@email.com', 'qwerty', '123456789', '2000-04-23', '1', '1', '1', 'fitz-sara', null, null),
    ('Julia', 'Stone', 'julia@email.com', 'qwerty', '123456789', '1998-06-09', '1', '1', '1', 'stone-julia', null, null),
    ('Ava', 'Pohl', 'ava@email.com', 'qwerty', '123456789', '1992-04-23', '1', '1', '1', 'pohl-ava', null, null),
    ('Jack', 'Michaels', 'jack@email.com', 'qwerty', '123456789', '1939-04-23', '0', '0', '0', 'michaels-jack', null, 20022);


CREATE TABLE `families`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `familyName` VARCHAR(30) NOT NULL,
    `adminUser` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 20022;

INSERT INTO families(familyName, adminUser)
VALUES
    ('Stephens', 10011),
    ('Weismann', 10012);

CREATE TABLE `children`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `gender` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `pronouns` ENUM('0', '1', '2') NOT NULL DEFAULT '0',
    `dob` CHAR(10) NOT NULL,
    `primaryFamily` MEDIUMINT NOT NULL,
    `familyAdminGuardian` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 30033;

INSERT INTO children(firstName, gender, dob, primaryFamily, familyAdminGuardian, pronouns)
VALUES
    ('Julie', '1', '2016-11-06', 20022, 10011, '1'),
    ('Peter', '0', '2015-09-15', 20022, 10011, '0'),
    ('Michael', '0', '2014-09-21', 20023, 10012, '0'),
    ('Lucy', '1', '2016-01-11', 20023, 10012, '1'),
    ('Robin', '2', '2013-05-01', 20023, 10012, '2');

CREATE TABLE `family_20022_members`(
    `grp` ENUM('adult', 'child') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL DEFAULT '0',
    `isPrimaryGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isExtendedFamilyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isThirdPartyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (grp,userId)
)ENGINE=MyISAM;

INSERT INTO family_20022_members(grp, userId, isAdminUser, isPrimaryGuardian, isExtendedFamilyGuardian, isThirdPartyGuardian)
VALUES
    ('adult', 10011, '1', '1', '0', '0'),
    ('adult', 10014, '0', '1', '0', '0'),
    ('child', 30033, '0', '0', '0', '0'),
    ('child', 30034, '0', '0', '0', '0'),
    ('adult', 10020, '0', '0', '1', '0');

CREATE TABLE `family_20023_members`(
    `grp` ENUM('adult', 'child') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL DEFAULT '0',
    `isPrimaryGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isExtendedFamilyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isThirdPartyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (grp,userId)
)ENGINE=MyISAM;

INSERT INTO family_20023_members(grp, userId, isAdminUser, isPrimaryGuardian)
VALUES
    ('adult', 10012, '1', '1'),
    ('adult', 10017, '0', '1'),
    ('child', 30035, '0', '0'),
    ('child', 30036, '0', '0'),
    ('child', 30037, '0', '0');

CREATE TABLE `invitations`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `invitor` MEDIUMINT NOT NULL,
    `invitorName` VARCHAR(40) NOT NULL,
    `invitorFamily` MEDIUMINT NOT NULL,
    `invitorFamilyName` VARCHAR(40) NOT NULL,
    `invitee` MEDIUMINT NOT NULL,
    `inviteeName` VARCHAR(40) NOT NULL,
    `inviteeRole` ENUM('primary', 'extended', 'third') NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 40044;

INSERT INTO invitations(invitor, invitorName, invitorFamily, invitorFamilyName, invitee, inviteeName, inviteeRole)
VALUES
    (10011, "Sofie Stephens", 20022, "Stephens", 10013, "Gale Vasquez", "third");


CREATE TABLE `familyDoctors`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `languages` VARCHAR(40) NOT NULL,
    `doctorType` VARCHAR(40) NOT NULL,
    `clinicName` VARCHAR(40) NOT NULL,
    `clinicPhoneNo` VARCHAR(30) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `family` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 50055;

INSERT INTO familyDoctors(firstName, lastName, languages, doctorType, clinicName, clinicPhoneNo, streetAddress, city, websiteURL, family)
VALUES
    ('Indrek', 'Oibupuu', 'EE,RU,GB', 'Family doctor', 'Confido', '1330', 'Veerenni 51', 'Tallinn', 'https://www.confido.ee', 20022),
    ('Helen', 'Ilves', 'EE,GB,DE', 'Pyschologist', 'Confido', '1330', 'Veerenni 51', 'Tallinn', 'https://www.confido.ee', 20022),
    ('Ingrid', 'Kapp', 'EE,GB,SE,FI', 'Family doctor', 'Ülemiste Perekliinik', '6665534', 'Valukoja 7', 'Tallinn', 'https://perekliinik.ee/', 20022);

CREATE TABLE `schools`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `schoolName` VARCHAR(40) NOT NULL,
    `schoolEmail` VARCHAR(40) NOT NULL,
    `schoolPhoneNo` VARCHAR(30) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `family` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 60066;

INSERT INTO schools(schoolName, schoolEmail, schoolPhoneNo, streetAddress, city, websiteURL, family)
VALUES
    ('Tallinna Inglise Kolledž', 'tik@tik.edu.ee', '6461306', 'Estonia pst 10', 'Tallinn', 'https://tik.edu.ee/', 20022),
    ('Tallinna Reaalkool', 'real@real.edu.ee', '6992026', 'Estonia pst 6', 'Tallinn', 'https://real.edu.ee/', 20022);

CREATE TABLE `teachers`(
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `mobileNo` BIGINT NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `schoolId` MEDIUMINT NOT NULL,
    `family` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 70077;

INSERT INTO teachers(firstName, lastName, mobileNo, email, schoolId, family)
VALUES
    ('Virve', 'Luik', '53300066', 'luik.v@tik.ee', 60066, 20022),
    ('Piret', 'Lumi', '53500088', 'lumi.p@tik.ee', 60066, 20022),
    ('Andres', 'Kirsipuu', '53500088', 'kirsipuu.a@real.edu.ee', 60067, 20022);


ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_adminfamily_foreign` FOREIGN KEY(`adminFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_familyadminguardian_foreign` FOREIGN KEY(`familyAdminGuardian`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitor_foreign` FOREIGN KEY(`invitor`) REFERENCES `users`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitee_foreign` FOREIGN KEY(`invitee`) REFERENCES `users`(`id`);
ALTER TABLE
    `invitations` ADD CONSTRAINT `invitations_invitorfamily_foreign` FOREIGN KEY(`invitorFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `familyDoctors` ADD CONSTRAINT `familydoctors_family_foreign` FOREIGN KEY(`family`) REFERENCES `families`(`id`);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_family_foreign` FOREIGN KEY(`family`) REFERENCES `families`(`id`);