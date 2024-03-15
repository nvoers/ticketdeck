import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET (request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        return NextResponse.json({"user": result})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}