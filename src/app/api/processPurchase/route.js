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
        }, SECRET, { expiresIn: '30s' });
        cookies().set('purchase', token, { secure: true, sameSite: 'strict' })
        cookies().delete("temporalURL")
        //console.log("order",order);
        const dataToXML = {
            fecha: calculateDate('current'),
            consecutivo: '001',
            emisor: {
                "nombre": contact.name,
                "identificacion": contact.DNI,
                "telefono": contact.phone,
                "correo": contact.email,
            },
            receptor: {
                "nombre": "All Blue",
                "identificacion": "00107780562",
                "correo": "allbluetours506@gmail.com"
            },
            detalle: order.detalle,
            resumen: {
                "Moneda": "Dolar",
                "Metodo de pago": "paypal",
                "total": 28.25,
                "total_iva": 0,
                "total_general": 31.5
            },
        }

        const responseXML = await fetch('http://10.90.29.148:8000/process_data_xml/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToXML)
        });
        const responsePDF = await fetch('http://10.90.29.160:5001/reporte01', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToXML)
        });
        if (!responseXML.ok) {
            throw new Error('Error al conectarse con xml');
        }
        if (!responsePDF.ok) {
            throw new Error('Error al conectarse con PDF');
        }
        const dataXML = await responseXML.json();
        const dataPDF = await responsePDF.json();

        console.log("xml res", dataXML);
        console.log("PDF res", dataPDF);

        return NextResponse.json({
            dataXML,
            dataPDF
        });
    } catch (error) {
        return NextResponse.json({ error: error?.message })
    }
}