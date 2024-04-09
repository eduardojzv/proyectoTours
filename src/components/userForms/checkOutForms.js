import React, { useState } from 'react'
import PaypalBtn from '../paypal/paypalBtn';
import { calculateDate } from '@/utils/handleDates';
import { generateUID } from '@/utils/generateUID';
import { useFormStore } from '@/storeZustand/formStore';
import { useReservationStore } from '@/storeZustand/reservationStore';
import Loading from '@/app/loading';
export default function CheckOutForms() {
    const { formContact } = useFormStore();
    const { reservation } = useReservationStore();
    const { amount, items } = reservation['0']
    const [loading, setLoading] = useState(false)
    return (
        <>
            {!loading
                ? <div>
                    <div className='flex flex-row gap-3 p-1'>
                        <span className='w-7 h-7 rounded-full text-center bg-black text-white'>3</span>
                        <span>Informacion de pago</span>
                    </div>
                    <div>
                        <p>Utilizaremos esta información para enviarle la confirmación y novedades acerca de su reserva.</p>
                    </div>
                    <div className="bg-white border rounded-lg shadow-lg px-6 py-8 w-full mx-auto mt-8">
                        <h1 className="font-bold text-2xl my-4 text-center text-blue-600">Green Zone</h1>
                        <hr className="mb-2" />
                        <div className="mb-6 flex flex-wrap justify-between">
                            <h1 className="text-lg font-bold">Factura</h1>
                            <div className="text-gray-700 flex flex-wrap flex-col">
                                <div><strong>Fecha: </strong> {calculateDate('current')}</div>
                                <div><strong>Factura #: </strong>{`TOUR-${generateUID().toUpperCase()}`}</div>
                            </div>
                        </div>
                        <div className="mb-8">
                            <h2 className="text-lg font-bold mb-4">Facturar a:</h2>
                            <div className="text-gray-700 mb-2">{`${formContact.name} ${formContact.lastName}`}</div>
                            <div className="text-gray-700 mb-2">Celular/telefono : {formContact.phone}</div>
                            <div className="text-gray-700">Correo Electronico : {formContact.email}</div>
                        </div>
                        <div className='overflow-x-auto flex justify-center '>
                            <table className="table-auto border border-slate-400">
                                <thead>
                                    <tr>
                                        <th className="text-left font-bold text-gray-700 border border-slate-300">Descripcion</th>
                                        <th className="text-left font-bold text-gray-700 border border-slate-300">Cantidad</th>
                                        <th className="text-left font-bold text-gray-700 border border-slate-300">Precio Unitario</th>
                                        <th className="text-right font-bold text-gray-700 border border-slate-300">sub-total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        items.length > 0 && items.map((item, idx) => (
                                            <tr key={`item-${idx}`}>
                                                <td className="text-left text-gray-700 border border-slate-300">{item.name}</td>
                                                <td className="text-left text-gray-700 border border-slate-300">{item.quantity}</td>
                                                <td className="text-left text-gray-700 border border-slate-300">{item.unit_amount.value}</td>
                                                <td className="text-left text-gray-700 border border-slate-300">{item.unit_amount.value * item.quantity}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td className="text-left font-bold text-gray-700 border border-slate-300">Total</td>
                                        <td className="text-right font-bold text-gray-700 border border-slate-300">${amount.value}</td>
                                    </tr>
                                </tfoot>
                            </table>

                        </div>
                        {/* <div className="text-gray-700 mb-2">Thank you for your business!</div>
                        <div className="text-gray-700 text-sm">Please remit payment within 30 days.</div> */}
                    </div>
                    <div className='flex justify-center mt-4 p-2'>
                        <PaypalBtn setLoading={setLoading} />
                    </div>
                </div >
                : <div className='bg-slate-700 text-white opacity-55 w-full min-h-full z-50 absolute top-[50%] left-[50%] translate translate-y-[-50%] translate-x-[-50%]'>
                    <Loading />
                </div>
            }

        </>
    )
}
