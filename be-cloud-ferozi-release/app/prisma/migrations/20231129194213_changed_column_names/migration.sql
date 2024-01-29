/*
  Warnings:

  - Added the required column `status` to the `user_ferozi` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserFeroziStatus" AS ENUM ('SAMPLE', 'CONTROL', 'TREATMENT');

-- AlterTable
ALTER TABLE "user_ferozi" ADD COLUMN     "status" "UserFeroziStatus" NOT NULL;
