CREATE TABLE `teachers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `phoneNumber` BIGINT NOT NULL,
    `school` BIGINT NOT NULL
);
CREATE TABLE `familyDoctors`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `clinicName` VARCHAR(40) NOT NULL,
    `clinicPhoneNo` BIGINT NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `country` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL
);
CREATE TABLE `schools`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `schoolName` VARCHAR(40) NOT NULL,
    `schoolPhoneNo` VARCHAR(40) NOT NULL,
    `streetAddress` VARCHAR(40) NOT NULL,
    `city` VARCHAR(40) NOT NULL,
    `country` VARCHAR(40) NOT NULL,
    `websiteURL` VARCHAR(40) NULL
);
CREATE TABLE `families`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `nickname` VARCHAR(40) NOT NULL,
    `adminUser` BIGINT NOT NULL
);
CREATE TABLE `family_[id]_roles`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `seesMedical` BIGINT NOT NULL,
    `seesEducation` BIGINT NOT NULL
);
CREATE TABLE `users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `sex` CHAR(2) NOT NULL DEFAULT '0' COMMENT '0 – male 1 – female',
    `gender` CHAR(3) NOT NULL DEFAULT '0' COMMENT '0 - man 1 - woman 2 - non-binary',
    `pronouns` CHAR(3) NOT NULL COMMENT '0 - he/him 1 - she/her 2 - they/them',
    `dob` DATE NOT NULL,
    `primaryFamily` BIGINT NULL,
    `photoSource` VARCHAR(40) NULL,
    `email` VARCHAR(40) NOT NULL,
    `password` VARCHAR(40) NOT NULL,
    `phoneNumber` VARCHAR(40) NOT NULL
);
CREATE TABLE `family_[id]_members`(
    `id` BIGINT NOT NULL,
    `isAdminUser` TINYINT(1) NOT NULL,
    `isPrimaryGuardian` TINYINT(1) NOT NULL,
    `isExtendedGuardian` TINYINT(1) NOT NULL,
    `isFriendGuardian` TINYINT(1) NOT NULL,
    `isChild` TINYINT(1) NOT NULL
);
ALTER TABLE
    `family_[id]_members` ADD PRIMARY KEY(`id`);
CREATE TABLE `children`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `firstName` VARCHAR(40) NOT NULL,
    `lastName` VARCHAR(40) NOT NULL,
    `sex` CHAR(2) NOT NULL DEFAULT '0' COMMENT '0 – male
1 – female',
    `gender` CHAR(3) NOT NULL DEFAULT '0' COMMENT '0 - boy
1 - girl
2 - non-binary',
    `pronouns` CHAR(3) NOT NULL DEFAULT '0' COMMENT '0 - he/him
1 - she/her
2 - they/them',
    `primaryFamily` BIGINT NOT NULL,
    `primaryGuardian` BIGINT NOT NULL,
    `familyDoctor` BIGINT NOT NULL,
    `teacher` BIGINT NOT NULL,
    `dob` DATE NOT NULL
);
ALTER TABLE
    `users` ADD CONSTRAINT `users_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `family_[id]_members` ADD CONSTRAINT `family_[id]_members_id_foreign` FOREIGN KEY(`id`) REFERENCES `users`(`id`);
ALTER TABLE
    `family_[id]_roles` ADD CONSTRAINT `family_[id]_roles_id_foreign` FOREIGN KEY(`id`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_familydoctor_foreign` FOREIGN KEY(`familyDoctor`) REFERENCES `familyDoctors`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryguardian_foreign` FOREIGN KEY(`primaryGuardian`) REFERENCES `users`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_primaryfamily_foreign` FOREIGN KEY(`primaryFamily`) REFERENCES `families`(`id`);
ALTER TABLE
    `teachers` ADD CONSTRAINT `teachers_school_foreign` FOREIGN KEY(`school`) REFERENCES `schools`(`id`);
ALTER TABLE
    `children` ADD CONSTRAINT `children_teacher_foreign` FOREIGN KEY(`teacher`) REFERENCES `teachers`(`id`);
ALTER TABLE
    `families` ADD CONSTRAINT `families_adminuser_foreign` FOREIGN KEY(`adminUser`) REFERENCES `users`(`id`);