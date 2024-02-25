/*
  Warnings:

  - A unique constraint covering the columns `[dogId]` on the table `Adopt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Adopt_dogId_key` ON `Adopt`(`dogId`);
