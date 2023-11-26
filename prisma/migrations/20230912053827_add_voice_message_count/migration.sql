-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "voiceMessageLimit" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "voiceMessageCount" INTEGER NOT NULL DEFAULT 0;
