-- AlterTable
ALTER TABLE `Reservation` MODIFY `email` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('MALE', 'FEMALE') NOT NULL DEFAULT 'MALE';
