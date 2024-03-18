import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();
    const response = await request.json()

    if(userId) {
        if(!response.receiverId) {
            return NextResponse.json({error: "Missing receiverId"}, {status: 400})
        }
        try {
            await prisma.ticket.update({
                where: {
                    id: params.id,
                    userId: userId
                },
                data: {
                    userId: response.receiverId
                }
            })
            return NextResponse.json(`Transfered ticket to ${response.receiverId}`, {status: 200})
        } catch (e) {
            return NextResponse.json({error: "Failed to transfer ticket"}, {status: 500})
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}