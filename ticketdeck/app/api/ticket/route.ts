import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { fromPath, fromBuffer } from "pdf2pic";
import jsQR from "jsqr";
import { writeFile } from 'fs/promises'
import path from 'path'

export async function POST(request: NextRequest) {
    const PNG = require('pngjs').PNG;

    const data = await request.formData()
    const file: File | null = data.get('ticket_info') as unknown as File
  
    if (!file) {
      return NextResponse.json({ success: false })
    }
  
    const bytes = await file.arrayBuffer()
    const fileBuffer = Buffer.from(bytes)
  
    // const uploadpath = `/tmp/${file.name}`
    // await writeFile(uploadpath, fileBuffer)
    // console.log(`open ${uploadpath} to see the uploaded file`)

    const pdf2picOptions = {
        quality: 100,
        density: 300,
        format: 'png',
        width: 2000,
        height: 2000,
    };
    const base64Response = await fromBuffer(fileBuffer, pdf2picOptions).bulk(-1, {responseType: "base64"} );
    const qrCodeTextList: string[] = []
    base64Response.forEach((responseElement) => {
        const dataUri = responseElement?.base64;
        if (!dataUri) {
            console.error('base64Response is undefined or null');
            // Handle the error or return early
            return NextResponse.json({ succes: false });
        }

        let buffer;
        try {
            buffer = Buffer.from(dataUri, 'base64');
        } catch (error) {
            console.error('Error creating buffer:', error);
            // Handle the error or return early
            return NextResponse.json({ succes: false });
        }

        const png = PNG.sync.read(buffer);
        const code = jsQR(Uint8ClampedArray.from(png.data), png.width, png.height);
        if (code?.data) {
            qrCodeTextList.push(code?.data)
        }
    });
    

    const { userId } = auth();

    qrCodeTextList.forEach(async (qrCodeText) => {
        if(userId) {
            const eventName = data.get('event_name') as string
            try {
                await prisma.ticket.create({
                    data: {
                        name: eventName,
                        code: qrCodeText,
                        date: new Date(data.get('event_date') as string).toISOString(),
                        userId: userId
                    }
                })
            } catch (e) {
                console.error(e)
                return NextResponse.json({error: "Error creating ticket"})
            }
        } else {
            return NextResponse.json({error: "Not logged in"}, {status: 401})
        }
    })

    return NextResponse.json({status: 200})
  
}

export async function DELETE(req : NextRequest) {
    const { userId } = auth();
    const searchParams = req.nextUrl.searchParams
    const id = searchParams.get('id')
    if(userId && id) {
        const result = await prisma.ticket.delete({
            where: {
                id: id
            }
        })
        return new NextResponse("Deleted ticket", {status: 200})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}

export async function GET(request : NextRequest) {
    const { userId } = auth();
    const searchParams = request.nextUrl.searchParams
    const datetimeFilter = new Date();
    datetimeFilter.setHours(0,0,0,0);
    
    if(userId) {
        const result = await prisma.ticket.findMany({
            where: {
                userId: userId,
                date: {
                    gte: datetimeFilter
                }
            },
            orderBy: {
                date: 'asc'
            }
        }) 
        const searchId = searchParams.get('id')
        if(searchId) {
            const ticket = await prisma.ticket.findUnique({
                where: {
                    userId: userId,
                    id: searchId
                }
            })
            return NextResponse.json({"ticket": ticket})
        }
        return NextResponse.json({"tickets": result.map((ticket) => {ticket.date = new Date(ticket.date); return ticket;})})
    } else {
        return NextResponse.json({error: "Not logged in"}, {status: 401})
    }
}