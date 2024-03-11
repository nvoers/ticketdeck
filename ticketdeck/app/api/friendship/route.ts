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
    const searchParams = request.nextUrl.searchParams
    const friendshipId = searchParams.get('id')

    if(userId) {
        if(friendshipId){
            const result = await prisma.friendship.findFirst({
                where: {
                    id: friendshipId,
                    status: "ACCEPTED"
                }
            })
            return NextResponse.json({"friendship": result}, {status: 200})
        }
        var result = await prisma.friendship.findMany({
            where: {
                OR: [
                    {
                        userId: userId
                    },
                    {
                        friendId: userId
                    }
                ]
            },
        })
        searchParams.forEach((value, key) => {
            if(key === "status") {
                result = result.filter((friendRequest) => {
                    return (friendRequest.status === value.toUpperCase())
                })
            }
            if(key === "outgoing") {
                if(value === "true"){
                    result = result.filter((friendRequest) => {
                        return (friendRequest.userId === userId)
                    })
                } else {
                    result = result.filter((friendRequest) => {
                        return (friendRequest.friendId === userId)
                    })
                }
            }
        })
        return NextResponse.json({"friendRequests": result}, {status: 200})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
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

export async function PATCH(request: NextRequest) {
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