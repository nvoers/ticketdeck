import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
    console.log(req.body);
    const res = await req.json();
    const result = await prisma.ticket.create({
        data: {
            name: res.event_name,
            code: res.ticket_info,
            date: new Date(res.event_date).toISOString(),
            user: {
                connect: { id: "clqezvvme0000nx71tk0oloyh" },
            },
        }
    })
    return NextResponse.json({result})
}