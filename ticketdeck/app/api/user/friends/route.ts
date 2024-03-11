import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FriendshipStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
    const { userId } = auth();

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
        let result = []
        for(const friendship of friendships) {
            if(friendship.userId === userId) {
                result.push(await prisma.user.findUnique({where: {id: friendship.friendId}}))
            } else {
                result.push(await prisma.user.findUnique({where: {id: friendship.userId}}))
            }
        }
        return NextResponse.json({"friends": result}, {status: 200})
    } else {
        return new NextResponse("Not logged in", {status: 401})
    }
}