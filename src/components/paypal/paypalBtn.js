'use client'
import { useFormStore } from "@/storeZustand/formStore";
import { useReservationStore } from "@/storeZustand/reservationStore";
import { extractData } from "@/utils/paypal/extractOnApproveData";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js"
import { useRouter } from 'next/navigation';
const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENTID
export default function PaypalBtn({ setLoading }) {
    const router = useRouter()
    const { reservation } = useReservationStore();
    const { formContact } = useFormStore()
    async function createOrder() {
        const { total, ...orderDetail } = reservation
        try {
            const res = await fetch('/api/checkout', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-store',
                body: JSON.stringify({ data: orderDetail, totalPrice: total })

            })
            const order = await res.json()
            return order?.id
        } catch (error) {
            return { error, status: 400 }
        }
    }
    async function onApprove(data, actions) {
        actions.order.capture().then(async (orderData) => {
            setLoading(true)
            //console.log("order data", orderData);
            try {
                const res = await fetch('/api/processPurchase', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    cache: 'no-store',
                    body: JSON.stringify(
                        {
                            order: extractData(orderData),
                            contact: formContact
                        }
                    )

                })
                if (!res.ok) {
                    throw new Error('Problemas de conexion')
                }
                const data = await res.json()
                console.log("data res", data);
                //await new Promise((resolve) => setTimeout(resolve, 3000))
                router.push("/thank_you")
            } catch (error) {
                return { error, status: 400 }
            }

        })
    }
    return (
        <>

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
        </>
    )
}
