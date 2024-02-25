SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists families;
DROP TABLE if exists children;
SET foreign_key_checks = 1;

CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(40) NOT NULL,
    `phoneNumber` VARCHAR(40) NOT NULL,
    `dob` DATE NOT NULL,
    `sex` CHAR(2) NOT NULL DEFAULT '0',
    `gender` CHAR(3) NOT NULL DEFAULT '0',
    `pronouns` CHAR(3) NOT NULL DEFAULT '0',
    `photoSource` VARCHAR(40) NULL
)ENGINE=INNODB AUTO_INCREMENT = 10000;

CREATE TABLE `families`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nickname` VARCHAR(40) NOT NULL,
    `adminUser` BIGINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 1000;

CREATE TABLE `children`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `sex` CHAR(2) NOT NULL DEFAULT '0',
    `gender` CHAR(3) NOT NULL DEFAULT '0',
    `pronouns` CHAR(3) NOT NULL DEFAULT '0',
    `primaryFamily` BIGINT NOT NULL,
    `primaryGuardian` BIGINT,
    `familyDoctor` BIGINT,
    `teacher` BIGINT,
    `dob` DATE NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 200000;


