/*
  Warnings:

  - You are about to drop the column `fullName` on the `Reservation` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfTenant` on the `Reservation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `fullName`,
    DROP COLUMN `numberOfTenant`,
    ADD COLUMN `full_name` VARCHAR(191) NULL,
    ADD COLUMN `number_of_tenant` INTEGER NULL;
