-- CreateEnum
CREATE TYPE "Userrole" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Userrole" NOT NULL DEFAULT 'USER';
