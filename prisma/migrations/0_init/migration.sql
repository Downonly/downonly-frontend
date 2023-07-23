-- CreateTable
CREATE TABLE `mints` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jobState` VARCHAR(255) NULL,
    `surface` VARCHAR(255) NULL,
    `obstacle` VARCHAR(255) NULL,
    `figure` VARCHAR(255) NULL,
    `ipfs` VARCHAR(255) NULL,
    `openSea` VARCHAR(255) NULL,

    UNIQUE INDEX `id`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

