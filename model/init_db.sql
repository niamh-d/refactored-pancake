SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists families;
DROP TABLE if exists children;
DROP TABLE if exists schools;
DROP TABLE if exists teachers;
DROP TABLE if exists familyDoctors;
DROP TABLE if exists family_20022_members;
DROP TABLE if exists family_20023_members;
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
    `adminFamily` MEDIUMINT DEFAULT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10011;

INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob, sex, gender, pronouns, photoSource, adminFamily)
VALUES
    ('Sofie', 'Stephens', 'sofie@email.com', 'qwerty', '123456789',  '1988-01-20', '1', '1', '1', 'stephens-sofie', 20022),
    ('Claus', 'Weismann', 'claus@email.com', 'qwerty', '123456789', '1987-02-12', '0', '0', '0', 'weismann-claus', 20023),
    ('Gale', 'Vasquez', 'gale@email.com', 'qwerty', '123456789', '1990-01-23', '1', '2', '2', 'vasquez-gale', null),
    ('Milan', 'Zukal', 'milan@email.com', 'qwerty', '123456789', '1988-04-29', '0', '0', '0', 'zukal-milan', null),
    ('Sebastian', 'Kruse', 'seb@email.com', 'qwerty', '123456789', '1988-07-23', '0', '2', '2', 'kruse-seb', null),
    ('Tamm', 'Tiiu', 'tiiu@email.com', 'qwerty', '123456789', '1987-10-25', '1', '1', '1', 'tamm-tiiu', null),
    ('Sara', 'Fitzpatrick', 'sara@email.com', 'qwerty', '123456789', '2000-04-23', '1', '1', '1', 'fitz-sara', null),
    ('Julia', 'Stone', 'julia@email.com', 'qwerty', '123456789', '1998-06-09', '1', '1', '1', 'stone-julia', null),
    ('Ava', 'Pohl', 'ava@email.com', 'qwerty', '123456789', '1992-04-23', '1', '1', '1', 'pohl-ava', null);


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
    `dob` CHAR(10) NOT NULL,
    `primaryFamily` MEDIUMINT NOT NULL,
    `familyAdminGuardian` MEDIUMINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 30033;

INSERT INTO children(firstName, gender, dob, primaryFamily, familyAdminGuardian)
VALUES
    ('Julie', '1', '2016-11-06', 20022, 10011),
    ('Peter', '0', '2015-09-15', 20022, 10011),
    ('Michael', '0', '2014-02-21', 20023, 10012),
    ('Lucy', '1', '2015-06-11', 20023, 10012),
    ('Robin', '2', '2013-09-01', 20023, 10012);

CREATE TABLE `family_20022_members`(
    `grp` ENUM('adult', 'child') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL DEFAULT '0',
    `isPrimaryGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isExtendedFamilyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    `isThirdPartyGuardian` TINYINT(1) NOT NULL DEFAULT '0',
    PRIMARY KEY (grp,userId)
)ENGINE=MyISAM;

INSERT INTO family_20022_members(grp, userId, isAdminUser, isPrimaryGuardian)
VALUES
    ('adult', 10011, '1', '1'),
    ('adult', 10014, '0', '1'),
    ('child', 30033, '0', '0'),
    ('child', 30034, '0', '0');

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
    ('child', 30035, '0', '0'),
    ('child', 30036, '0', '0'),
    ('child', 30037, '0', '0');


ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_adminfamily_foreign` FOREIGN KEY(`adminFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_familyAdminGuardian_foreign` FOREIGN KEY(`familyAdminGuardian`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);