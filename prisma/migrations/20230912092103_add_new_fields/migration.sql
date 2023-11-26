-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "avoidTopics" TEXT DEFAULT '',
ADD COLUMN     "explicitContent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "uniqueTopics" TEXT DEFAULT '';
