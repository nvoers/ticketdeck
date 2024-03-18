import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { Friendship, FriendshipStatus, User } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.has("query") ? searchParams.get("query")?.toLowerCase() as string : ""

    if(userId) {
        const friendships : Friendship[] = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                initiatedFriendships: {
                    where: {
                        OR: [
                            {status: FriendshipStatus.ACCEPTED},
                            {status: FriendshipStatus.REQUESTED}
                        ]
                    }
                },
                receivedFriendships: {
                    where: {
                        OR: [
                            {status: FriendshipStatus.ACCEPTED},
                            {status: FriendshipStatus.REQUESTED}
                        ]
                    }
                }
            }
        }).then((user) => { return user?.initiatedFriendships.concat(user?.receivedFriendships) }) as Friendship[]
        let friends : User[] = []
        for(const friendship of friendships){
            if(friendship.initiatorId === userId){
                const friend : User = await prisma.user.findFirst({
                    where: {
                        id: friendship.receiverId,
                        OR: [
                            {username: {contains: query}},
                            {firstName: {contains: query}},
                            {lastName: {contains: query}},
                        ]
                    }
                }) as User
                if(friend){
                    friends.push(friend)
                }
            } else {
                const friend : User = await prisma.user.findFirst({
                    where: {
                        id: friendship.initiatorId,
                        OR: [
                            {username: {contains: query}},
                            {firstName: {contains: query}},
                            {lastName: {contains: query}},
                        ]
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