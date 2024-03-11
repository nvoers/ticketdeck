import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')?.toLowerCase()

    if(userId){
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: query
                }
            }
        })

        // const friends = await fetch(process.env.URL + "/api/user/friends?uid", {
        //     method: 'GET',
        //     cache: 'no-store',
        //     headers: {Authorization: `Bearer ${auth().getToken()}`}
        // });
        // const result = await friends.json();
        // let nonfriends = []
        // for(const user of users){
        //     let isFriend = false
        //     for(const friend of result.friends){
        //         if(friend == user.id){
        //             isFriend = true
        //         }
        //     }
        //     if(!isFriend){
        //         nonfriends.push(user)
        //     }
        // }
        return NextResponse.json({"users": users})
    } else {
        return NextResponse.json({"error": "Unauthorized"}, {status: 401})
    }
}