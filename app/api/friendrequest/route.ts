import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
    const response = await request.json()
    try {
        const result = await prisma.friendship.create({
            data: {
                user: {
                    connect: {
                        id: response.userId
                    }
                },
                friend: {
                    connect: {
                        id: response.friendId
                    }
                }
            }
        })
        console.log(result)
        return new NextResponse("Created friend request", {status: 200})
    } catch (e) {
        console.error('Error creating friend request:', e);
        return new NextResponse("Error sending friend request: " + e, {status: 500})
    }
}