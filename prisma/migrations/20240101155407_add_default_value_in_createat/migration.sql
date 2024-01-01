-- AlterTable
ALTER TABLE "cities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "comments" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;