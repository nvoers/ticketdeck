import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Friendship, User } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        const friendships : Friendship[] = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                initiatedFriendships: true,
                receivedFriendships: true
            }
        }).then((user) => { return user?.initiatedFriendships.concat(user?.receivedFriendships) }) as Friendship[]
        let friends : User[] = []
        for(const friendship of friendships){
            if(friendship.initiatorId === userId){
                const friend : User = await prisma.user.findUnique({
                    where: {
                        id: friendship.receiverId
                    }
                }) as User
                if(friend){
                    friends.push(friend)
                }
            } else {
                const friend : User = await prisma.user.findUnique({
                    where: {
                        id: friendship.initiatorId
                    }
                }) as User
                if(friend){
                    friends.push(friend)
                }
            }
        }
        return NextResponse.json({"friends": friends})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}