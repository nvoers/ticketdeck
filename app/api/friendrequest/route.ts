import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const response = await request.json()
    console.log(response)
    return NextResponse.json({ success: true })
}