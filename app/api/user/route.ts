import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request) {
    const { userId } = auth();
    const response = await request.json();
    if(userId) {
        const result = await prisma.user.findMany({
            where: {
                id: {
                    contains: response.query
                }
            }
        })
        return NextResponse.json({result})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}