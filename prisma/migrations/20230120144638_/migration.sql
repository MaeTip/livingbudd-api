/*
  Warnings:

  - You are about to drop the column `full_name` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `full_name`,
    ADD COLUMN `fullname` VARCHAR(191) NULL;
