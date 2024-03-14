import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const all = searchParams.has('all')

    if(userId) {
        if(id){
            const result = await prisma.friendshipRequest.findFirst({
                where: {
                    AND: [
                        {id: id},
                        {status: "REQUESTED"}
                    ]
                }
            })
            return NextResponse.json({"friendRequest": result})
        }
        if(all){
            const requests = await prisma.friendshipRequest.findMany({
                orderBy: {
                    created_at: 'desc'
                }
            })
            let combinedResult: any[] = []
            for(const request of requests){
                const user = await prisma.user.findUnique({
                    where: {
                        id: request.userId
                    }
                })
                const friend = await prisma.user.findUnique({
                    where: {
                        id: request.friendId
                    }
                })
                if(user){
                    combinedResult.push(
                        {
                            request: request,
                            user: user,
                            friend: friend
                        }
                    )
                }
            }
            return NextResponse.json({"friendRequests": combinedResult})
        }
        const result = await prisma.friendshipRequest.findMany({
            where: {
                AND: [
                    {friendId: userId},
                    {status: "REQUESTED"}
                ]
            }
        })
        return NextResponse.json({"friendRequests": result})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const { userId } = auth();

    if(userId) {
        if(id){
            try {
                await prisma.friendshipRequest.create({
                    data: {
                        userId: userId,
                        friendId: id
                    }
                })
            } catch (error) {
                return new NextResponse("Friendship request already sent", {status: 400})
            }
        }
        return new NextResponse("Friendship request sent", {status: 200})
    } else {
        return new NextResponse("Unauthorized", {status: 401})
    }
}