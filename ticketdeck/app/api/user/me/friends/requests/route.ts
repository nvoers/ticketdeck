import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Friendship, FriendshipStatus } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    
    if(userId) {
        try {
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
            if(!requests)
                return NextResponse.json({error: "response undefined"}, {status: 404})
            return NextResponse.json({"requests": requests}, {status: 200})
        } catch (error) {
            return NextResponse.json({error: "Server error"}, {status: 500})
        }
        
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}