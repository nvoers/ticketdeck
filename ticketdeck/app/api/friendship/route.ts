import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const all = searchParams.has('all')

    if(userId) {
        if(all) {
            const result = await prisma.friendship.findMany({
                orderBy: {
                    created_at: 'desc'
                }
            })
            let combinedResult: any[] = []
            for(const friendship of result){
                const user = await prisma.user.findUnique({
                    where: {
                        id: friendship.userId
                    }
                })
                const friend = await prisma.user.findUnique({
                    where: {
                        id: friendship.friendId
                    }
                
                })
                if(user && friend){
                    combinedResult.push(
                        {
                            friendship: friendship,
                            user: user,
                            friend: friend
                        }
                    )
                }
            }
            return NextResponse.json({"friendships": combinedResult})
        }
        const id = searchParams.get('id')
        if(id){
            const friendship = await prisma.friendship.findUnique({
                where: {
                    id: id
                }
            })
            if(friendship){
                const user = await prisma.user.findUnique({
                    where: {
                        id: friendship.userId
                    }
                })
                const friend = await prisma.user.findUnique({
                    where: {
                        id: friendship.friendId
                    }
                })
                if(user && friend){
                    return NextResponse.json({friendship: {
                        friendship: friendship,
                        user: user,
                        friend: friend
                    }})
                }
            }
        }
    }
}