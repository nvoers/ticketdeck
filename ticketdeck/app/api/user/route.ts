import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get('query')
    const id = searchParams.get('id')
    const admin = searchParams.has('admin')
    const all = searchParams.has('all')

    const { userId } = auth();
    
    if(userId) {
        if(query){
            const result = await prisma.user.findMany({
                where: {
                    username: {
                        contains: query
                    }
                }
            })
            return NextResponse.json({"users": result})
        }
        if(id){
            const result = await prisma.user.findUnique({
                where: {
                    id: id
                }
            })
            return NextResponse.json({"user": result})
        }
        const result = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        if(all && result?.role == "ADMIN"){
            const result = await prisma.user.findMany(
                {orderBy: {
                    username: "asc"
                }}
            )
            return NextResponse.json({"users": result})
        }
        if(admin){
            if(result?.role == "ADMIN")
                return NextResponse.json({"admin": true})
            else
                return NextResponse.json({"admin": false})
        }
        return NextResponse.json({"user": result})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}