/*
  Warnings:

  - Added the required column `categoryId` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Video` ADD COLUMN `categoryId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `VideoCategory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Video` ADD CONSTRAINT `Video_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `VideoCategory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
