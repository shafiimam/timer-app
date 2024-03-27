/*
  Warnings:

  - You are about to drop the column `timerDesignId` on the `Timer` table. All the data in the column will be lost.
  - You are about to drop the column `timer_type` on the `Timer` table. All the data in the column will be lost.
  - You are about to drop the `TimerDesign` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[timerStyleId]` on the table `Timer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `timerStyleId` to the `Timer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_timerDesignId_fkey";

-- DropIndex
DROP INDEX "Timer_timerDesignId_key";

-- AlterTable
ALTER TABLE "Timer" DROP COLUMN "timerDesignId",
DROP COLUMN "timer_type",
ADD COLUMN     "timerStyleId" TEXT NOT NULL;

-- DropTable
DROP TABLE "TimerDesign";

-- CreateTable
CREATE TABLE "TimerStyle" (
    "id" TEXT NOT NULL,
    "template" TEXT NOT NULL DEFAULT 'custom',
    "position" TEXT NOT NULL DEFAULT 'top',
    "stickyTimer" BOOLEAN NOT NULL DEFAULT false,
    "cardBackgroundType" TEXT NOT NULL DEFAULT 'plain',
    "cardBackgroundColor" TEXT NOT NULL DEFAULT '#FFFFFF',
    "cardBackgroundGradientStart" TEXT NOT NULL DEFAULT '#FFFFFF',
    "cardBackgroundGradientEnd" TEXT NOT NULL DEFAULT '#DDDDDD',
    "cardBackgroundGradientAngle" INTEGER NOT NULL DEFAULT 90,
    "borderRadius" INTEGER NOT NULL DEFAULT 10,
    "borderSize" INTEGER NOT NULL DEFAULT 2,
    "borderColor" TEXT NOT NULL DEFAULT '#000000',
    "spacingTop" INTEGER NOT NULL DEFAULT 20,
    "spacingBottom" INTEGER NOT NULL DEFAULT 20,
    "spacingLeft" INTEGER NOT NULL DEFAULT 20,
    "spacingRight" INTEGER NOT NULL DEFAULT 20,
    "font" TEXT NOT NULL DEFAULT 'default',
    "titleSize" INTEGER NOT NULL DEFAULT 20,
    "titleColor" TEXT NOT NULL DEFAULT '#000000',
    "subHeadingSize" INTEGER NOT NULL DEFAULT 14,
    "subHeadingColor" TEXT NOT NULL DEFAULT '#000000',
    "timerSize" INTEGER NOT NULL DEFAULT 30,
    "timerColor" TEXT NOT NULL DEFAULT '#000000',
    "timerLegendSize" INTEGER NOT NULL DEFAULT 14,
    "timerLegendColor" TEXT NOT NULL DEFAULT '#000000',
    "closeIconColor" TEXT NOT NULL DEFAULT '#000000',

    CONSTRAINT "TimerStyle_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Timer_timerStyleId_key" ON "Timer"("timerStyleId");

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerStyleId_fkey" FOREIGN KEY ("timerStyleId") REFERENCES "TimerStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
