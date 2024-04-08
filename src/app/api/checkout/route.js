import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'
//conectarse a una aplicacion en modo desarrollo
const enviroment=new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENTID,process.env.PAYPAL_SECRET)
const client = new paypal.core.PayPalHttpClient(enviroment)
export async function POST(request) {
    try {
        const {data} = await request.json()
        request = new paypal.orders.OrdersCreateRequest();
        request.requestBody({
            intent: "CAPTURE",
            purchase_units:[data[0]]
        })
        const response = await client.execute(request)
        return NextResponse.json({ id: response.result.id });
    } catch (error) {
        console.log("error",error);
        return NextResponse.json({error})
    }
}