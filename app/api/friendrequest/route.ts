import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs'

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
        return new NextResponse("Created friend request", {status: 200})
    } catch (e) {
        console.error('Error creating friend request:', e);
        return new NextResponse("Error sending friend request: " + e, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    const { userId } = auth();
    try {
        const result = await prisma.friendship.findMany({
            where: {
                OR:[{userId: userId},{friendId: userId}]
            }
        })
        return new NextResponse(JSON.stringify(result), {status: 200})
    } catch (e) {
        console.error('Error getting friend requests:', e);
        return new NextResponse("Error getting friend requests: " + e, {status: 500})
    }
}

export async function DELETE(request: NextRequest) {
    const response = await request.json()
    try {
        const result = await prisma.friendship.delete({
            where: {
                id: response.friendshipId
            }
        })
        return new NextResponse("Deleted friend request", {status: 200})
    } catch (e) {
        console.error('Error deleting friend request:', e);
        return new NextResponse("Error deleting friend request: " + e, {status: 500})
    }
}

export async function PUT(request: NextRequest) {
    const response = await request.json()
    try {
        const result = await prisma.friendship.update({
            where: {id: response.friendshipId},
            data: {
                status: response.status
            }
        })
        return new NextResponse("Updated friend request", {status: 200})
    } catch (e) {
        console.error('Error updating friend request:', e);
        return new NextResponse("Error updating friend request: " + e, {status: 500})
    }
}