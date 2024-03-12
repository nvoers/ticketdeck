import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const { userId } = auth();

    if(userId) {
        if(id){
            await prisma.friendshipRequest.update({
                where: {
                    id: id
                },
                data: {
                    status: "ACCEPTED"
                }
            })
            const friendId = await prisma.friendshipRequest.findUnique({
                where: {
                    id: id
                }
            })
            if(!friendId) return new NextResponse("Friend request not found", {status: 404})
            await prisma.friendship.create({
                data: {
                    userId: userId,
                    friendId: friendId.userId,
                }
            })
        } else {
            return new NextResponse("Friend request not found", {status: 404})
        }
        return new NextResponse("Friend request accepted", {status: 200})
    } else {
        return new NextResponse("Unauthorized", {status: 401})
    }
}