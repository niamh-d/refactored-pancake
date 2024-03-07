CREATE TABLE `teachers`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `mobileNo` VARCHAR(40) NOT NULL,
    `email` VARCHAR(40) NOT NULL,
    `schoolId` MEDIUMINT NOT NULL,
    `familyId` MEDIUMINT NOT NULL
);
CREATE TABLE `family_doctors`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `languages` VARCHAR(40) NOT NULL,
    `doctorType` VARCHAR(40) NOT NULL,
    `clinicId` MEDIUMINT NOT NULL,
    `familyId` MEDIUMINT NOT NULL
);
CREATE TABLE `schools`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `schoolName` VARCHAR(40) NOT NULL,
    `schoolEmail` VARCHAR(40) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `country` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `schoolPhoneNo` VARCHAR(40) NOT NULL,
    `familyId` MEDIUMINT NOT NULL
);
CREATE TABLE `families`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `familyName` VARCHAR(40) NOT NULL,
    `adminUser` MEDIUMINT NOT NULL
);
CREATE TABLE `invitations`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `invitor` MEDIUMINT NOT NULL,
    `invitorName` VARCHAR(40) NOT NULL,
    `invitorFamily` MEDIUMINT NOT NULL,
    `invitorFamilyName` VARCHAR(40) NOT NULL,
    `invitee` MEDIUMINT NOT NULL,
    `inviteeName` VARCHAR(40) NOT NULL,
    `inviteeRole` ENUM('') NOT NULL
);
CREATE TABLE `users`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `sex` ENUM('') NOT NULL DEFAULT '0' COMMENT '0 – male 1 – female',
    `gender` ENUM('') NOT NULL DEFAULT '0' COMMENT '0 - man 1 - woman 2 - non-binary',
    `pronouns` ENUM('') NOT NULL COMMENT '0 - he/him 1 - she/her 2 - they/them',
    `dob` CHAR(10) NOT NULL,
    `email` VARCHAR(30) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phoneNumber` VARCHAR(30) NOT NULL,
    `photoSource` VARCHAR(30) NOT NULL,
    `adminFamily` MEDIUMINT NOT NULL,
    `family` MEDIUMINT NOT NULL
);
CREATE TABLE `family_[id]_members`(
    `grp` ENUM('') NOT NULL,
    `userId` MEDIUMINT NOT NULL,
    `isAdminUser` TINYINT NOT NULL AUTO_INCREMENT,
    `isPrimaryGuardian` TINYINT NOT NULL AUTO_INCREMENT,
    `isExtendedFamilyGuardian` TINYINT NOT NULL AUTO_INCREMENT,
    `isThirdPartyGuardian` TINYINT NOT NULL AUTO_INCREMENT,
    PRIMARY KEY(`grp`)
);
ALTER TABLE
    `family_[id]_members` ADD PRIMARY KEY(`userId`);
CREATE TABLE `children`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `sex` ENUM('') NOT NULL DEFAULT '0' COMMENT '0 – male
1 – female',
    `gender` ENUM('') NOT NULL DEFAULT '0' COMMENT '0 - boy
1 - girl
2 - non-binary',
    `pronouns` ENUM('') NOT NULL DEFAULT '0' COMMENT '0 - he/him
1 - she/her
2 - they/them',
    `primaryFamily` MEDIUMINT NOT NULL,
    `familyAdminGuardian` MEDIUMINT NOT NULL,
    `dob` CHAR(10) NOT NULL
);
CREATE TABLE `clinics`(
    `id` MEDIUMINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `clinicName` VARCHAR(40) NOT NULL,
    `clinicEmail` VARCHAR(40) NOT NULL,
    `clinicPhoneNo` VARCHAR(40) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL,
    `familyId` MEDIUMINT NOT NULL
);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_schoolid_foreign` FOREIGN KEY(`schoolId`) REFERENCES `schools`(`id`);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `clinics` ADD CONSTRAINT `clinics_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `family_doctors` ADD CONSTRAINT `family_doctors_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `schools` ADD CONSTRAINT `schools_familyid_foreign` FOREIGN KEY(`familyId`) REFERENCES `families`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_family_foreign` FOREIGN KEY(`family`) REFERENCES `families`(`id`);
ALTER TABLE
    `family_[id]_members` ADD CONSTRAINT `family_[id]_members_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `users`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_adminfamily_foreign` FOREIGN KEY(`adminFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `users` ADD CONSTRAINT `users_id_foreign` FOREIGN KEY(`id`) REFERENCES `invitations`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_familyadminguardian_foreign` FOREIGN KEY(`familyAdminGuardian`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_id_foreign` FOREIGN KEY(`id`) REFERENCES `family_[id]_members`(`userId`);
ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);
ALTER TABLE
    `family_doctors` ADD CONSTRAINT `family_doctors_clinicid_foreign` FOREIGN KEY(`clinicId`) REFERENCES `clinics`(`id`);