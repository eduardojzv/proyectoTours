'use server'
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
export async function createCookie(url) {
    const SECRET = process.env.COOKIE_SECRET
    const secret = SECRET
    const token = sign({
        temp: url
    }, secret, { expiresIn: '1d' });
    cookies().set('temporalURL', token, { secure: true, sameSite: 'none' })
    redirect(`/shoppingCart/${url}`)
}