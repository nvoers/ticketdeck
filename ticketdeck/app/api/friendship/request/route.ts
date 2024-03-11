import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')

    if(userId) {
        if(id){
            const result = await prisma.friendship.findMany({
                where: {
                    AND: [
                        {id: id},
                        {status: "REQUESTED"}
                    ]
                }
            })
            return NextResponse.json({"friendRequest": result[0]})
        }
        const result = await prisma.friendship.findMany({
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