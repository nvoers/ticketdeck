import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();

    if(userId) {
        const token = await auth().getToken();
        const admin = await fetch(`${process.env.BASE_URL}/api/user/${userId}/admin`, {
                method: 'GET',
                cache: 'no-store',
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => response.json()).then((data) => data.admin);
        if(admin) {
            try {
                const friendship = await prisma.friendship.findUnique({
                    where: {
                        id: params.id
                    }
                })
                return NextResponse.json({"friendship": friendship}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to get friendship"}, {status: 500})
            }
        } else {
            try {
                const friendship = await prisma.friendship.findUnique({
                    where: {
                        id: params.id,
                        OR: [
                            {initiatorId: userId},
                            {receiverId: userId}
                        ]
                    }
                })
                return NextResponse.json({"friendship": friendship}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to get friendship"}, {status: 500})
            }
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { userId } = auth();

    if(userId) {
        const token = await auth().getToken();
        const admin = await fetch(`${process.env.BASE_URL}/api/user/${userId}/admin`, {
                method: 'GET',
                cache: 'no-store',
                headers: {Authorization: `Bearer ${token}`}
            }).then((response) => response.json()).then((data) => data.admin);
        if(admin) {
            try {
                await prisma.friendship.delete({
                    where: {
                        id: params.id
                    }
                })
                return NextResponse.json({message: 'Deleted friendship'}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to delete friendship"}, {status: 500})
            }
        } else {
            try {
                await prisma.friendship.delete({
                    where: {
                        id: params.id,
                        OR: [
                            {initiatorId: userId},
                            {receiverId: userId}
                        ]
                    }
                })
                return NextResponse.json({message: 'Deleted friendship'}, {status: 200})
            } catch (e) {
                return NextResponse.json({error: "Failed to delete friendship"}, {status: 500})
            }
        }
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}