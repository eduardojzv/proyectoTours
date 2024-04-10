'use server'
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
export async function createCookie(url) {
    const SECRET = process.env.COOKIE_SECRET
    const token = sign({
        temp: url
    }, SECRET, { expiresIn: '1d' });
    console.log("server Action secret",SECRET);
    cookies().set('temporalURL', token, { secure: true, sameSite: 'none' })
    redirect(`/shoppingCart/${url}`)
}