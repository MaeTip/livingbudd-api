/*
  Warnings:

  - You are about to drop the `UserReservation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `UserReservation`;

-- CreateTable
CREATE TABLE `Reservation` (
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

    UNIQUE INDEX `Reservation_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
