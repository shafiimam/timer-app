/*
  Warnings:

  - A unique constraint covering the columns `[timerPlacementSettingId]` on the table `Timer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timerPlacementSettingId` to the `Timer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Timer" ADD COLUMN     "timerPlacementSettingId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Timer_timerPlacementSettingId_key" ON "Timer"("timerPlacementSettingId");

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerPlacementSettingId_fkey" FOREIGN KEY ("timerPlacementSettingId") REFERENCES "TimerPlacementType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
