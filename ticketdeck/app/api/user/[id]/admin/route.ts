import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();
    if(userId) {
        const result = await prisma.user.findUnique({
            where: {
                id: params.id
            }
        }).then((user) => { if (user) {return user.role === "ADMIN"} else {return false}})
        return NextResponse.json({"admin": result})
    } else {
        return NextResponse.json({error: "Not authorized"}, {status: 403})
    }
}