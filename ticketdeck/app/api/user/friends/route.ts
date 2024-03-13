import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { FriendshipStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const uid = searchParams.get('uid')

    if(userId) {
        let friendships = []
        const userfriends = await prisma.friendship.findMany({
            where: {
                userId: userId
            }
        })
        const friendfriends = await prisma.friendship.findMany({
            where: {
                friendId: userId
            }
        })
        if(uid){
            let uid = []
            for (const friend of userfriends) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: friend.friendId
                    }
                })
                uid.push(user?.id)
            }
            for (const friend of friendfriends) {
                const user = await prisma.user.findUnique({
                    where: {
                        id: friend.userId
                    }
                })
                uid.push(user?.id)
            }
            return NextResponse.json({"friends": uid}, {status: 200})
        }
        for (const friend of userfriends) {
            const user = await prisma.user.findUnique({
                where: {
                    id: friend.friendId
                }
            })
            friendships.push({friendshipId: friend.id, user: user})
        }
        for (const friend of friendfriends) {
            const user = await prisma.user.findUnique({
                where: {
                    id: friend.userId
                }
            })
            friendships.push({friendshipId: friend.id, user: user})
        }
        return NextResponse.json({"friends": friendships}, {status: 200})
    } else {
        return new NextResponse("Not logged in", {status: 401})
    }
}