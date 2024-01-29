/*
  Warnings:

  - Added the required column `type` to the `ferozi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FeroziType" AS ENUM ('INAPP_POPUP', 'OTHER');

-- AlterTable
ALTER TABLE "ferozi" ADD COLUMN     "meta_data" JSONB,
ADD COLUMN     "type" "FeroziType" NOT NULL;
