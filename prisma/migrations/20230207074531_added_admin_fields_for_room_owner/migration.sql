-- AlterTable
ALTER TABLE `RoomOwner` ADD COLUMN `admin_comment` VARCHAR(191) NULL,
    ADD COLUMN `is_mark_as_read` BOOLEAN NULL DEFAULT false;
