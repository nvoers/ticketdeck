import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { User } from '@prisma/client';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')?.toLowerCase()

    if(userId){
        const friendships = await prisma.friendshipRequest.findMany({
            where: {
                OR: [
                    {
                        userId: userId
                    },
                    {
                        friendId: userId
                    }
                ]
            }
        })
        let friendIds = []
        for(const friendship of friendships){
            if(friendship.userId == userId){
                friendIds.push(friendship.friendId)
            } else { 
                friendIds.push(friendship.userId) 
            }
        }

        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: query
                }
            }
        })
        let filteredUsers : User[] = []
        for(var x = 0; x < users.length; x++){
            if(!friendIds.includes(users[x].id)){
                filteredUsers.push(users[x])
            }
        }
        return NextResponse.json({"users": filteredUsers})
    } else {
        return NextResponse.json({"error": "Unauthorized"}, {status: 401})
    }
}