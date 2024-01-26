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
    const convert = fromBuffer(fileBuffer, pdf2picOptions)
    const base64Response = await convert(1, {responseType: "base64"} );
    const dataUri = base64Response?.base64;
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
    const qrCodeText = code?.data;

    const { userId } = auth();
    
    if(userId) {
        const eventName = data.get('event_name') as string
        const result = await prisma.ticket.create({
            data: {
                name: eventName,
                code: qrCodeText,
                date: new Date(data.get('event_date') as string).toISOString(),
                userId: userId
            }
        })
        return NextResponse.json({succes: true})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
  
}

export async function DELETE(req) {
    const { userId } = auth();
    const res = await req.json();
    if(userId) {
        const result = await prisma.ticket.delete({
            where: {
                id: res.ticketId
            }
        })
        return NextResponse.json({result})
    } else {
        return NextResponse.json({error: "Not logged in"})
    }
}