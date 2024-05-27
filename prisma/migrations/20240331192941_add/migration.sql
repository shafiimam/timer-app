-- CreateTable
CREATE TABLE "Session" (
    "_id" TEXT NOT NULL,
    "shop" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "isOnline" BOOLEAN NOT NULL DEFAULT false,
    "scope" TEXT,
    "expires" TIMESTAMP(3),
    "accessToken" TEXT NOT NULL,
    "userId" BIGINT,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TimerLabel" (
    "_id" TEXT NOT NULL,
    "day" TEXT NOT NULL DEFAULT 'Days',
    "hour" TEXT NOT NULL DEFAULT 'Hrs',
    "minute" TEXT NOT NULL DEFAULT 'Mins',
    "second" TEXT NOT NULL DEFAULT 'Secs',

    CONSTRAINT "TimerLabel_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Translation" (
    "_id" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subHeadig" TEXT NOT NULL,
    "timerID" TEXT,

    CONSTRAINT "Translation_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CountDownToDateTimerType" (
    "_id" TEXT NOT NULL,
    "startRightNow" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "onceEnds" TEXT,
    "customTitle" TEXT,
    "customSubHeading" TEXT,
    "timerId" TEXT NOT NULL,

    CONSTRAINT "CountDownToDateTimerType_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "FixedMinTimerType" (
    "_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "onceEnds" TEXT,
    "customTitle" TEXT,
    "customSubHeading" TEXT,
    "timerId" TEXT NOT NULL,

    CONSTRAINT "FixedMinTimerType_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "DailyRecurringTimerType" (
    "_id" TEXT NOT NULL,
    "daysOfWeek" TEXT[],
    "dailyStartTime" TIMESTAMP(3) NOT NULL,
    "dailyEndTime" TIMESTAMP(3) NOT NULL,
    "customTitle" TEXT,
    "customSubHeading" TEXT,
    "startToday" BOOLEAN NOT NULL,
    "neverEnds" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "onceEnds" TEXT,
    "timerId" TEXT NOT NULL,

    CONSTRAINT "DailyRecurringTimerType_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "CartPageTimerType" (
    "_id" TEXT NOT NULL,
    "timerId" TEXT NOT NULL,
    "minutes" INTEGER NOT NULL DEFAULT 10,
    "onceEnds" TEXT DEFAULT 'repeatTimer',

    CONSTRAINT "CartPageTimerType_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TimerStyle" (
    "_id" TEXT NOT NULL,
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

    CONSTRAINT "TimerStyle_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "TimerPlacementType" (
    "_id" TEXT NOT NULL,
    "timerType" TEXT NOT NULL,
    "selectedProducts" TEXT[],
    "selectedProductTags" TEXT[],
    "showOnAllCountries" BOOLEAN NOT NULL DEFAULT true,
    "selectedCountries" TEXT[],
    "showOnEveryPage" BOOLEAN NOT NULL DEFAULT true,
    "showOnHomePageOnly" BOOLEAN NOT NULL,
    "showOnAllProductsPage" BOOLEAN NOT NULL,
    "showOnSpecificProductsPage" BOOLEAN NOT NULL,
    "showOnSpecificProductTagsPage" BOOLEAN NOT NULL,
    "showOnAllCollectionPages" BOOLEAN NOT NULL,
    "showOnSpecificCollectionsPage" BOOLEAN NOT NULL,
    "selectedCollections" TEXT[],
    "showOnCustomPosition" BOOLEAN NOT NULL,
    "showOnPasswordPage" BOOLEAN NOT NULL,

    CONSTRAINT "TimerPlacementType_pkey" PRIMARY KEY ("_id")
);

-- CreateTable
CREATE TABLE "Timer" (
    "_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subHeadig" TEXT NOT NULL,
    "timerLabelId" TEXT NOT NULL,
    "translationIds" TEXT[],
    "timerType" TEXT NOT NULL DEFAULT 'countDownToDate',
    "timerStyleId" TEXT NOT NULL,
    "timerPlacement" TEXT NOT NULL DEFAULT 'top',
    "callToAction" TEXT NOT NULL,
    "closeIcon" BOOLEAN NOT NULL,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Session_shop_key" ON "Session"("shop");

-- CreateIndex
CREATE UNIQUE INDEX "CountDownToDateTimerType_timerId_key" ON "CountDownToDateTimerType"("timerId");

-- CreateIndex
CREATE UNIQUE INDEX "FixedMinTimerType_timerId_key" ON "FixedMinTimerType"("timerId");

-- CreateIndex
CREATE UNIQUE INDEX "DailyRecurringTimerType_timerId_key" ON "DailyRecurringTimerType"("timerId");

-- CreateIndex
CREATE UNIQUE INDEX "CartPageTimerType_timerId_key" ON "CartPageTimerType"("timerId");

-- CreateIndex
CREATE UNIQUE INDEX "Timer_timerLabelId_key" ON "Timer"("timerLabelId");

-- CreateIndex
CREATE UNIQUE INDEX "Timer_timerStyleId_key" ON "Timer"("timerStyleId");

-- AddForeignKey
ALTER TABLE "Translation" ADD CONSTRAINT "Translation_timerID_fkey" FOREIGN KEY ("timerID") REFERENCES "Timer"("_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CountDownToDateTimerType" ADD CONSTRAINT "CountDownToDateTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FixedMinTimerType" ADD CONSTRAINT "FixedMinTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRecurringTimerType" ADD CONSTRAINT "DailyRecurringTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CartPageTimerType" ADD CONSTRAINT "CartPageTimerType_timerId_fkey" FOREIGN KEY ("timerId") REFERENCES "Timer"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerLabelId_fkey" FOREIGN KEY ("timerLabelId") REFERENCES "TimerLabel"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_timerStyleId_fkey" FOREIGN KEY ("timerStyleId") REFERENCES "TimerStyle"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
