-- CreateTable
CREATE TABLE `Room` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `google_map` VARCHAR(191) NULL,
    `building` VARCHAR(191) NULL,
    `floor` VARCHAR(191) NULL,
    `size` INTEGER NOT NULL,
    `number_of_bedroom` INTEGER NOT NULL,
    `number_of_bathroom` INTEGER NULL DEFAULT 0,
    `maintenance_fee` INTEGER NULL,
    `amenities` VARCHAR(191) NOT NULL,
    `facilities` VARCHAR(191) NOT NULL,
    `nearby_area` VARCHAR(191) NOT NULL,
    `is_created_by_owner` BOOLEAN NOT NULL DEFAULT false,
    `rental_price` INTEGER NOT NULL,
    `rental_desposit` INTEGER NOT NULL,
    `rental_advance_payment` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
