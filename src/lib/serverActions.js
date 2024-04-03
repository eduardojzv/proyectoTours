'use server'
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'
export async function createCookie(url) {
    const SECRET = process.env.COOKIE_SECRET
    const secret =SECRET
    const token = sign({
        temp: url
    }, secret, { expiresIn: '1d' });
    cookies().set('temporalURL', token, {secure:true,sameSite:'none' })
    console.log("OOO",cookies().get('temporalURL'));
}
//