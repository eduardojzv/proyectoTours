'use server'
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'
export async function createCookie(url) {
    const secret = '5ceXkDfXW!nqSKTF?2@Rbnd7Rk*q4#'
    const token = sign({
        temp: url
    }, secret, { expiresIn: '1d' });
    cookies().set('temporalURL', token, { secure: true })
}
//