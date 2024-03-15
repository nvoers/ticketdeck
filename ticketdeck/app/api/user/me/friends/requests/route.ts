import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Friendship, FriendshipStatus, User } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        const requests : Friendship[] = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                receivedFriendships: {
                    where: {
                        status: FriendshipStatus.REQUESTED
                    },
                    include: {
                        initiator: true,
                    }
                }
            }
        }).then((user) => { return user?.receivedFriendships }) as Friendship[]
        return NextResponse.json({"requests": requests})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}