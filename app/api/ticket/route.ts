import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function POST(req) {
    const { userId } = auth();
    const res = await req.json();
    if(userId) {
        const result = await prisma.ticket.create({
            data: {
                name: res.event_name,
                code: res.ticket_info,
                date: new Date(res.event_date).toISOString(),
                userId: userId
            }
        })
        return NextResponse.json({result})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}

export async function DELETE(req) {
    const { userId } = auth();
    const res = await req.json();
    if(userId) {
        const result = await prisma.ticket.delete({
            where: {
                id: res.id
            }
        })
        return NextResponse.json({result})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}