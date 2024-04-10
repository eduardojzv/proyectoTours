import { NextResponse } from 'next/server'
export async function POST(request) {
    try {
        const {order,contact} = await request.json()
        return NextResponse.json({ order,contact});
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error })
    }
}