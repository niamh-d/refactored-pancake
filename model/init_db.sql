SET foreign_key_checks = 0;
DROP TABLE if exists users;
DROP TABLE if exists families;
DROP TABLE if exists children;
DROP TABLE if exists schools;
DROP TABLE if exists teachers;
DROP TABLE if exists familyDoctors;
SET foreign_key_checks = 1;

CREATE TABLE `users`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(40) NOT NULL,
    `phoneNumber` VARCHAR(40) NOT NULL,
    `dob` CHAR(10) NOT NULL,
    `sex` CHAR(1) NOT NULL DEFAULT '0',
    `gender` CHAR(1) NOT NULL DEFAULT '0',
    `pronouns` CHAR(1) NOT NULL DEFAULT '0',
    `photoSource` VARCHAR(40) NULL,
    `adminFamily` BIGINT DEFAULT NULL
)ENGINE=INNODB AUTO_INCREMENT = 10050;

INSERT INTO users(firstName, lastName, email, password, phoneNumber, dob, sex, gender, pronouns, photoSource)
VALUES
    ('Sofie', 'Stephens', 'sofie@email.com', 'qwerty', '123456789',  '1990-01-20', '1', '1', '1', 'stephens-sofie'),
    ('Claus', 'Weismann', 'claus@email.com', 'qwerty', '123456789', '1992-02-12', '0', '0', '0', 'weismann-claus'),
    ('Gale', 'Vasquez', 'gale@email.com', 'qwerty', '123456789', '1989-01-23', '1', '2', '2', 'vasquez-gale');


CREATE TABLE `families`(
    `id` BIGINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nickname` VARCHAR(40) NOT NULL,
    `adminUser` BIGINT NOT NULL
)ENGINE=INNODB AUTO_INCREMENT = 1000;


ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_adminfamily_foreign` FOREIGN KEY(`adminFamily`) REFERENCES `families`(`id`);