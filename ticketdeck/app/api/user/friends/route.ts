import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FriendshipStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams

    if(userId) {
        const friendships = await prisma.friendship.findMany({
            where: {
                OR: [
                    {
                        userId: userId
                    },
                    {
                        friendId: userId
                    }
                ],
                status: FriendshipStatus.ACCEPTED
            },
        })
        const result = friendships.map((friendship) => {
            if(friendship.userId === userId) {
                // return await prisma.user.findUnique({where: {id: friendship.friendId}})
                return friendship.friendId
            } else {
                // return await prisma.user.findUnique({where: {id: friendship.userId}})
                return friendship.userId
            }
        })
        if(searchParams.get("not") === "true"){
            const notFriends = await prisma.user.findMany({
                where: {
                    id: {
                        notIn: result,
                        not: userId
                    },
                    username: {
                        contains: searchParams.get("query") as string
                    
                    }
                }
            })
            return NextResponse.json({"users": notFriends}, {status: 200})
        } else {
            return NextResponse.json({"friends": result}, {status: 200})
        }
    } else {
        return new NextResponse("Not logged in", {status: 401})
    }
}