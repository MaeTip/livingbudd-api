-- AlterTable
ALTER TABLE `Room` MODIFY `amenities` VARCHAR(191) NULL,
    MODIFY `facilities` VARCHAR(191) NULL,
    MODIFY `nearby_area` VARCHAR(191) NULL,
    MODIFY `rental_desposit` INTEGER NULL,
    MODIFY `rental_advance_payment` INTEGER NULL;
