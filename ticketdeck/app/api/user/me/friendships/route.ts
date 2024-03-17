import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs";
import { Friendship, FriendshipStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { userId } = auth();

    if(userId) {
        try {
            const friendships : Friendship[] = await prisma.friendship.findMany({
                where: {
                    OR: [
                        {initiatorId: userId},
                        {receiverId: userId}
                    ],
                    status: FriendshipStatus.ACCEPTED
                },
                include: {
                    initiator: true,
                    receiver: true
                }
            })
            return NextResponse.json({"friendships": friendships}, {status: 200})
        } catch (error) {
            return NextResponse.json({error: "Can't find friends"}, {status: 500})
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}