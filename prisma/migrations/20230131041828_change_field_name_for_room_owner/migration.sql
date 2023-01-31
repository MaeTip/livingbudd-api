/*
  Warnings:

  - You are about to drop the column `condition` on the `RoomOwner` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `RoomOwner` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `RoomOwner` table. All the data in the column will be lost.
  - Added the required column `room_location` to the `RoomOwner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room_price` to the `RoomOwner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `RoomOwner` DROP COLUMN `condition`,
    DROP COLUMN `location`,
    DROP COLUMN `price`,
    ADD COLUMN `room_condition` VARCHAR(191) NULL,
    ADD COLUMN `room_location` VARCHAR(191) NOT NULL,
    ADD COLUMN `room_price` INTEGER NOT NULL;
