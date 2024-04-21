import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
export async function POST(request) {
    try {
        const {order,contact} = await request.json()
        const SECRET = process.env.COOKIE_SECRET
        const token = sign({
            pay_state:true
        }, SECRET, { expiresIn: '120s' });
        cookies().set('purchase', token, { secure: true, sameSite: 'strict' })
        cookies().delete("temporalURL")
        return NextResponse.json({ order,contact});
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error })
    }
}