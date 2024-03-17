/*
  Warnings:

  - You are about to drop the column `friendId` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the `FriendshipRequest` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `initiatorId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiverId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Made the column `userId` on table `Ticket` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Userrole" AS ENUM ('USER', 'ADMIN');

-- AlterEnum
ALTER TYPE "FriendshipStatus" ADD VALUE 'REMOVED';

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_friendId_fkey";

-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_userId_fkey";

-- DropIndex
DROP INDEX "Friendship_friendId_userId_key";

-- DropIndex
DROP INDEX "Friendship_userId_friendId_key";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "friendId",
DROP COLUMN "userId",
ADD COLUMN     "initiatorId" TEXT NOT NULL,
ADD COLUMN     "receiverId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'REQUESTED';

-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "userId" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Userrole" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "FriendshipRequest";

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_initiatorId_fkey" FOREIGN KEY ("initiatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
