-- CreateTable
CREATE TABLE "Age" (
    "id" TEXT NOT NULL,
    "age" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Age_pkey" PRIMARY KEY ("id")
);
