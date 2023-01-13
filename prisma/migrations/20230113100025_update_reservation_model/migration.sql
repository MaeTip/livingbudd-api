/*
  Warnings:

  - You are about to drop the column `hash` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Reservation_email_key` ON `Reservation`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `hash`;
