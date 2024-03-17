import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { userId } = auth();
    const body = await request.json();

    if(userId) {
        if(!body.receiverId) {
            return NextResponse.json({error: "Missing receiverId"}, {status: 400})
        }
        try {
            await prisma.friendship.create({
                data: {
                    initiatorId: userId,
                    receiverId: body.receiverId
                }
            })
            return NextResponse.json({message: 'Friend request sent'}, {status: 200})
        } catch (e) {
            return NextResponse.json({error: "Failed to add friend"}, {status: 500})
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}