'use server'
import { EmailTemplate } from '@/components/emailTemplate/emailTemplate';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import { Resend } from 'resend';
export async function createCookie(url) {
    const SECRET = process.env.COOKIE_SECRET
    const token = sign({
        temp: url
    }, SECRET, { expiresIn: '1d' });
    console.log("server Action secret", SECRET);
    cookies().set('temporalURL', token, { secure: true, sameSite: 'none' })
    redirect(`/shoppingCart/${url}`)
}
export async function sendEmail(data) {
    console.log("server action sendEmail",data);
    const resend = new Resend(process.env.RESEND);
    try {
        const data = await resend.emails.send({
            from: 'Acme <onboarding@resend.dev>',
            to: ['paolamo16816@gmail.com'],
            subject: 'xvideos.com',
            react: EmailTemplate({ firstName: 'paola' }),
        });
        console.log("data",data);
    } catch (error) {
        console.log("eee",error);
    }
}