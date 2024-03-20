import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/lib/prisma'

export async function GET (request: NextRequest) {
    const { userId } = auth();
    if(userId) {
        try {
            const result = await prisma.user.findFirst({
                where: {
                    id: userId
                }
            })
            if(!result)
                return NextResponse.json({error: "Can't find user"}, {status: 404})
            return NextResponse.json({"user": result}, {status: 200})
        } catch (error) {
            return NextResponse.json({error: "Can't find user"}, {status: 500})
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}