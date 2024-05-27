/*
  Warnings:

  - The primary key for the `CartPageTimerType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `CartPageTimerType` table. All the data in the column will be lost.
  - The primary key for the `CountDownToDateTimerType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `CountDownToDateTimerType` table. All the data in the column will be lost.
  - The primary key for the `DailyRecurringTimerType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `DailyRecurringTimerType` table. All the data in the column will be lost.
  - The primary key for the `FixedMinTimerType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `FixedMinTimerType` table. All the data in the column will be lost.
  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `Timer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Timer` table. All the data in the column will be lost.
  - The primary key for the `TimerLabel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `TimerLabel` table. All the data in the column will be lost.
  - The primary key for the `TimerPlacementType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `TimerPlacementType` table. All the data in the column will be lost.
  - The primary key for the `TimerStyle` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `TimerStyle` table. All the data in the column will be lost.
  - The primary key for the `Translation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `_id` on the `Translation` table. All the data in the column will be lost.
  - The required column `id` was added to the `CartPageTimerType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `CountDownToDateTimerType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `DailyRecurringTimerType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `FixedMinTimerType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `id` to the `Session` table without a default value. This is not possible if the table is not empty.
  - The required column `id` was added to the `Timer` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TimerLabel` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TimerPlacementType` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `TimerStyle` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `Translation` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "CartPageTimerType" DROP CONSTRAINT "CartPageTimerType_timerId_fkey";

-- DropForeignKey
ALTER TABLE "CountDownToDateTimerType" DROP CONSTRAINT "CountDownToDateTimerType_timerId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRecurringTimerType" DROP CONSTRAINT "DailyRecurringTimerType_timerId_fkey";

-- DropForeignKey
ALTER TABLE "FixedMinTimerType" DROP CONSTRAINT "FixedMinTimerType_timerId_fkey";

-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_timerLabelId_fkey";

-- DropForeignKey
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_timerStyleId_fkey";

-- DropForeignKey
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_timerID_fkey";

-- AlterTable
ALTER TABLE "CartPageTimerType" DROP CONSTRAINT "CartPageTimerType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CartPageTimerType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "CountDownToDateTimerType" DROP CONSTRAINT "CountDownToDateTimerType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "CountDownToDateTimerType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DailyRecurringTimerType" DROP CONSTRAINT "DailyRecurringTimerType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DailyRecurringTimerType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "FixedMinTimerType" DROP CONSTRAINT "FixedMinTimerType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "FixedMinTimerType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Timer" DROP CONSTRAINT "Timer_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Timer_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TimerLabel" DROP CONSTRAINT "TimerLabel_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TimerLabel_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TimerPlacementType" DROP CONSTRAINT "TimerPlacementType_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TimerPlacementType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "TimerStyle" DROP CONSTRAINT "TimerStyle_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "TimerStyle_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Translation" DROP CONSTRAINT "Translation_pkey",
DROP COLUMN "_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Translation_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_timerID_fkey" FOREIGN KEY ("timerID") REFERENCES "Timer"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountDownToDateTimerType" ADD CONSTRAINT "CountDownToDateTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedMinTimerType" ADD CONSTRAINT "FixedMinTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecurringTimerType" ADD CONSTRAINT "DailyRecurringTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartPageTimerType" ADD CONSTRAINT "CartPageTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerLabelId_fkey" FOREIGN KEY ("timerLabelId") REFERENCES "TimerLabel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerStyleId_fkey" FOREIGN KEY ("timerStyleId") REFERENCES "TimerStyle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
