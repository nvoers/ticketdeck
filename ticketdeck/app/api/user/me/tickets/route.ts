import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { Ticket } from "@prisma/client";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        const datetimeFilter = new Date();
        datetimeFilter.setHours(0,0,0,0);
        const tickets : Ticket[] = await prisma.ticket.findMany({
            where: {
                userId: userId,
                date: {
                    gte: datetimeFilter
                }
            },
            orderBy: {
                date: "asc"
            },

        })
        return NextResponse.json({"tickets": tickets})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}