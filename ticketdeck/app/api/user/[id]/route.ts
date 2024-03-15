import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();
    if(userId) {
        const admin = await prisma.user.findUnique({
            where: {
                id: userId
            }
        }).then((user) => {return user?.role === "ADMIN"})
        if(!admin) {
            return NextResponse.json({error: "Not authorized"}, {status: 403})
        } else {
            const result = await prisma.user.findUnique({
                where: {
                    id: params.id
                }
            })
            return NextResponse.json({"user": result})
        }
    } else {
        return NextResponse.json({error: "Not authorized"}, {status: 403})
    }
}