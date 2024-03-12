import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

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