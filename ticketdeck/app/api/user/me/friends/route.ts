import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return NextResponse.json({"user": user})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}