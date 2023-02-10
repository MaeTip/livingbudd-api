/*
  Warnings:

  - You are about to drop the column `rental_desposit` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Room` DROP COLUMN `rental_desposit`,
    ADD COLUMN `detail` VARCHAR(191) NULL,
    ADD COLUMN `rental_deposit` INTEGER NULL;
