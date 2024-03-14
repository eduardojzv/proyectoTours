import paypal from '@paypal/checkout-server-sdk'
import { NextResponse } from 'next/server'
const clientID = "Abw6qKIh74v82QQ6qwfJnvLBWb44IzT9L2ltp3oJQvkmCdPxQNyT_Kz2UnQacuVfJMYYC5dghxHantL6"
const clientSecret = "EGgFQVwYEk5UzZ1ZNEgICzPPRfKNuAhOSpWkznDRgsfesgvacxqzp5mj57IzDH3QT8gPsATATmVMqdRk"
//conectarse a una aplicacion en modo desarrollo
//const enviroment=new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENTID,process.env.PAYPAL_SECRET)
const enviroment = new paypal.core.SandboxEnvironment(clientID, clientSecret)

//enviar ordenes de node a paypal
const client = new paypal.core.PayPalHttpClient(enviroment)
export async function POST() {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: "CAPTURE",
        purchase_units: [
            {
                amount: {
                    currency_code: "USD",
                    value: "150.00",
                    
                    breakdown: {
                        item_total: {
                            currency_code: "USD",
                            value: "150.00",
                        }
                    },
                },
                items: [
                    {
                        name: "Book test",
                        description: "descripcion de prieba",
                        quantity: "1",
                        unit_amount: {
                            currency_code: "USD",
                            value: "50.00"
                        }
                    },
                    {
                        name: "Book test02",
                        description: "descripcion de prieba02",
                        quantity: "2",
                        unit_amount: {
                            currency_code: "USD",
                            value: "50.00"
                        }
                    },
                ]
            }
        ]
    })
    const response = await client.execute(request)
    console.log("response", response);
    return NextResponse.json({ id: response.result.id });
}