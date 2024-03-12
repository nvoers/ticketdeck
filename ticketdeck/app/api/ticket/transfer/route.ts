import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
    const { userId } = auth();
    const response = await request.json()

    if(userId && response.userId && response.ticketId) {
        const result = await prisma.ticket.update({
            where: {
                id: response.ticketId,
                userId: userId
            },
            data: {
                userId: response.userId
            }
        })
        return NextResponse.json(`Transfered ticket to ${response.userId}`, {status: 200})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}