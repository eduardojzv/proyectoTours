'use client'
import { useReservationStore } from "@/storeZustand/reservationStore";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID
export default function PaypalBtn() {
    if (!(useReservationStore)) return <div></div>
    const { reservation } = useReservationStore();
    async function createOrder() {
        const { total, ...orderDetail } = reservation
        const res = await fetch('/api/checkout', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Especifica el tipo de contenido como JSON
            },
            cache: 'no-store',
            body: JSON.stringify({ data: orderDetail, totalPrice: total })

        })
        const order = await res.json()
        return order.id
    }
    return (
        <PayPalScriptProvider options={{
            clientId: clientId,
        }}>
            <PayPalButtons
            className="w-2/4"
                style={{
                    layout:  'vertical',
                    color:   'blue',
                    shape:   'rect',
                    label:   'paypal'
                }}
                createOrder={createOrder}
                onApprove={(data, actions) => {
                    actions.order.capture().then((orderData) => {
                        console.log("data", orderData);

                    })
                }}
                onCancel={() => null}
            />
        </PayPalScriptProvider>

    )
}
