import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'
import { FriendshipStatus } from '@prisma/client';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();

    if(userId) {
        const admin : boolean = await fetch(`api/user/${userId}/admin`).then((response) => response.json()).then((data) => data.admin)
        if(admin) {
            try {
                await prisma.friendship.update({
                    where: {
                        id: params.id
                    },
                    data: {
                        status: FriendshipStatus.ACCEPTED
                    }
                })
                return NextResponse.json({message: 'Accepted friendship request'}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to accept friendship request"}, {status: 500})
            }
        } else {
            try {
                await prisma.friendship.update({
                    where: {
                        id: params.id,
                        OR: [
                            {initiatorId: userId},
                            {receiverId: userId}
                        ]
                    },
                    data: {
                        status: FriendshipStatus.ACCEPTED
                    }
                })
                return NextResponse.json({message: 'Accepted friendship request'}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to accept friendship request"}, {status: 500})
            }
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}