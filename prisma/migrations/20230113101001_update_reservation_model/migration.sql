/*
  Warnings:

  - You are about to drop the column `special_request` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `special_request`,
    ADD COLUMN `additional_request` VARCHAR(191) NULL;
