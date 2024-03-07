import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(request : NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams;
    const friendshipId = searchParams.get("friendshipId");

    if(userId) {
        if(friendshipId == null) {
            return NextResponse.json({error: "friendshipId is required"})
        }
        const friend = await prisma.user.findFirst({
            where: {
                id: {
                    not: userId
                },
                OR: [
                    {
                        userFriendships: {
                            some: {
                                id: friendshipId
                            }
                        }
                    },
                    {
                        friendFriendships: {
                            some: {
                                id: friendshipId
                            }
                        }
                    }
                ]
            }
        })
        return NextResponse.json({"friend": friend}, {status: 200})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}
