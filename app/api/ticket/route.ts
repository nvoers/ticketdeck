import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req) {
    const res = await req.json();
    const result = await prisma.ticket.create({
        data: {
            name: res.event_name,
            code: res.ticket_info,
            date: res.event_date,
            user: {
                connect: { id: "clqezvvme0000nx71tk0oloyh" },
            },
        }
    })
    return NextResponse.json({result})
}