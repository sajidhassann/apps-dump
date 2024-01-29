-- CreateEnum
CREATE TYPE "FeroziNature" AS ENUM ('OPTIMISTIC', 'PESSIMISTIC');

-- AlterTable
ALTER TABLE "ferozi" ADD COLUMN     "nature" "FeroziNature" NOT NULL DEFAULT 'OPTIMISTIC';
