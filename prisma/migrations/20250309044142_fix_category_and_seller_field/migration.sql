/*
  Warnings:

  - Added the required column `category` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` ADD COLUMN `category` ENUM('buah', 'sayur', 'bibit', 'pupuk') NOT NULL;
