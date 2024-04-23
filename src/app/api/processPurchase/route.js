import { calculateDate } from '@/utils/handleDates';
import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server'
export async function POST(request) {
    try {
        const { order, contact } = await request.json()
        const SECRET = process.env.COOKIE_SECRET
        const token = sign({
            pay_state: true
        }, SECRET, { expiresIn: '120s' });
        cookies().set('purchase', token, { secure: true, sameSite: 'strict' })
        cookies().delete("temporalURL")
        //console.log("order",order);
        return NextResponse.json({
            data: {
                fecha: calculateDate('current'),
                consecutivo: '001',
                emisor: {
                    "nombre": contact.name,
                    "identificacion": contact.DNI,
                    "telefono": contact.phone,
                    "correo": contact.email,
                },
                receptor: {
                    "nombre": "Juanitito",
                    "identificacion": "Pérez",
                    "correo": "Pérez@gmail.com"
                },
                detalle: order.detalle,
                resumen: {
                    "Moneda": "Dolar",
                    "Metodo de pago": "paypal",
                    "total": 28.25,
                    "total_iva":0,
                    "total_general": 31.5

                },
            }
        });
    } catch (error) {
        console.log("error", error);
        return NextResponse.json({ error })
    }
}