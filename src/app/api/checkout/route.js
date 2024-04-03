import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'
const clientID = "Abw6qKIh74v82QQ6qwfJnvLBWb44IzT9L2ltp3oJQvkmCdPxQNyT_Kz2UnQacuVfJMYYC5dghxHantL6"
const clientSecret = "EGgFQVwYEk5UzZ1ZNEgICzPPRfKNuAhOSpWkznDRgsfesgvacxqzp5mj57IzDH3QT8gPsATATmVMqdRk"
//conectarse a una aplicacion en modo desarrollo
//const enviroment=new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENTID,process.env.PAYPAL_SECRET)
const enviroment = new paypal.core.SandboxEnvironment(clientID, clientSecret)
const client = new paypal.core.PayPalHttpClient(enviroment)
export async function POST(request) {
    try {
        const {data} = await request.json()
        console.log(JSON.stringify([data[0]]));
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