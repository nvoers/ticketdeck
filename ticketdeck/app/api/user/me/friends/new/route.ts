import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.has("query") ? searchParams.get("query")?.toLowerCase() as string : ""

    if(userId) {
        if(query){
            const token = await auth().getToken();
            let friends = await fetch(`${process.env.BASE_URL}/api/user/me/friends`, {
                method: 'GET',
                cache: 'no-store',
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => response.json()).then((data) => data.friends);
            friends = friends ? friends.map((friend: User) => friend.id) : []
            const users = await prisma.user.findMany({
                where: {
                    NOT: {
                        id: userId
                    },
                    AND: [
                        {username: {contains: query}},
                        {id: {notIn: friends}}
                    ]
                }
            })
            return NextResponse.json({"users": users}, {status: 200})
        }
    } else {}
}