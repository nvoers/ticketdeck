import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const id = searchParams.get('id')
    const { userId } = auth();

    if(userId) {
        if(id){
            await prisma.friendshipRequest.delete({
                where: {
                    id: id
                }
            })
        } else {
            return new NextResponse("Friend request not found", {status: 404})
        }
        return new NextResponse("Friend request declined", {status: 200})
    } else {
        return new NextResponse("Unauthorized", {status: 401})
    }
}