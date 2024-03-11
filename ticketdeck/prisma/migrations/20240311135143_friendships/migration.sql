-- AlterTable
ALTER TABLE "Friendship" ALTER COLUMN "status" SET DEFAULT 'ACCEPTED';

-- CreateTable
CREATE TABLE "FriendshipRequest" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "friendId" TEXT NOT NULL,
    "status" "FriendshipStatus" NOT NULL DEFAULT 'REQUESTED',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendshipRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendshipRequest_userId_friendId_key" ON "FriendshipRequest"("userId", "friendId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendshipRequest_friendId_userId_key" ON "FriendshipRequest"("friendId", "userId");
