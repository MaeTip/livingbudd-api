/*
  Warnings:

  - You are about to drop the column `age` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `has_pet` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfTenant` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `special_request` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `vehicle` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `working_address` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `AdminUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `age`,
    DROP COLUMN `contact`,
    DROP COLUMN `fullName`,
    DROP COLUMN `gender`,
    DROP COLUMN `has_pet`,
    DROP COLUMN `numberOfTenant`,
    DROP COLUMN `phone`,
    DROP COLUMN `special_request`,
    DROP COLUMN `vehicle`,
    DROP COLUMN `working_address`,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `AdminUser`;

-- CreateTable
CREATE TABLE `UserReservation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `email` VARCHAR(191) NOT NULL,
    `hash` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NOT NULL,
    `age` INTEGER NULL,
    `phone` VARCHAR(191) NULL,
    `contact` VARCHAR(191) NULL,
    `numberOfTenant` INTEGER NULL,
    `has_pet` BOOLEAN NOT NULL DEFAULT false,
    `vehicle` ENUM('MOTORCYCLE', 'CAR', 'MOTORCYCLE_AND_CAR', 'NO') NOT NULL DEFAULT 'NO',
    `working_address` VARCHAR(191) NULL,
    `special_request` VARCHAR(191) NULL,

    UNIQUE INDEX `UserReservation_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
