/*
  Warnings:

  - You are about to drop the column `ansaudio` on the `character_chat` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "character_chat" DROP COLUMN "ansaudio",
ADD COLUMN     "answeraudio" TEXT NOT NULL DEFAULT '';
