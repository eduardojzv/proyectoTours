'use client'
import { useReservationStore } from "@/storeZustand/reservationStore";
import { extractData } from "@/utils/paypal/extractOnApproveData";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useRouter } from 'next/navigation';
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID
export default function PaypalBtn() {
    const router=useRouter()
    //if (!(useReservationStore)) return <div></div>
    const { reservation } = useReservationStore();
    async function createOrder() {
        console.log("reservation",reservation);
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
    async function onApprove(data, actions) {
        actions.order.capture().then((orderData) => {
            console.log("dataaaaa", extractData(orderData));
            router.push("/thank_you")
            
        })
    }
    return (
        <PayPalScriptProvider options={{
            clientId: clientId,
        }}>
            <PayPalButtons
                className="w-2/4"
                style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal'
                }}
                createOrder={createOrder}
                onApprove={onApprove}
                //onCancel={() => null}
            />
        </PayPalScriptProvider>

    )
}
