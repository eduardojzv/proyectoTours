"use client"
import Information from '@/icons/information'
import { Button, Divider, Radio, RadioGroup, cn } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import { numberSeparator } from '@/utils/numberSeparator'
import InputsCart from '../inputsCart.js/inputsCart'
import defaultClients from '@/utils/defaultClients'
import Calendar from '@/icons/calendar'
import { transformToPayPalFormat } from '@/utils/transformToPayPalFormat'
import { useReservationStore } from '@/storeZustand/reservationStore'
import { useFormStore } from '@/storeZustand/formStore'
import { calculateDate, formatDate } from '@/utils/handleDates'
import { generateUID } from '@/utils/generateUID'
import { createCookie } from '@/lib/serverActions'
export default function ReservationCard({ data }) {
    const { handleReservation } = useReservationStore()
    const { initformDetail } = useFormStore();
    const [sliderCart, setSliderCart] = useState(0);
    const [clients, setClients] = useState(defaultClients(data.tours[sliderCart].precios));
    const [total, setTotal] = useState(0);
    const [tourDate, setTourDate] = useState('')
    const [clientsPaypal, setClientsPaypal] = useState(transformToPayPalFormat(clients))
    function handleClients(client, tariff, quantity) {
        const updatedClients = { ...clients };
        if (quantity > 0) {
            updatedClients[client] = {
                quantity,
                tariff,
                cost: (quantity * tariff)
            };
        }
        else {
            delete updatedClients[client];
        }
        setClients(updatedClients);
    }
    function handleTransportCart(idx) {
        setSliderCart(idx);
        setClients(defaultClients(data.tours[idx].precios))
    }
    function handleDate(event) {
        const { value } = event.target
        setTourDate(value)
    }
    useEffect(() => {
        const newTotal = Object.values(clients).reduce((acc, currentValue) => acc + (currentValue.quantity * currentValue.tariff), 0);
        setTotal(newTotal);
        setClientsPaypal(transformToPayPalFormat(clients, newTotal))

    }, [sliderCart, clients]);
    async function setLocalStorage() {
        const UID=generateUID()
        var timeStamp = Date.now();
        const newClients = {};
        const { descripcion, titulo, duracion, fecha } = data.tours[sliderCart];
        const { img } = data.isla
        for (const key in clients) {
            if (Object.hasOwnProperty.call(clients, key)) {
                newClients[key] = clients[key].quantity
            }
        }
        const tourData = {
            descripcion,
            titulo,
            duracion,
            fecha,
            islaImg: img[0]
        };
        handleReservation({
            ...clientsPaypal,
            timeStamp,
            tourData,
            clients: newClients,
            tourDate: formatDate(tourDate)
        })
        initformDetail(newClients)
        await createCookie(UID)
    }
    return (
        <form className="w-full h-fit bg-white p-2 rounded-lg lg:w-2/4" action={setLocalStorage}>
            <div className="flex justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <p className="text-lg">Reserve su asiento</p>
                </div>
            </div>
            <Divider />
            <div>
                <p className='flex flex-row gap-2 font-bold'><Information style={"w-8 h-8"} />El precio general es el precio por persona sin importar edad o estado</p>
                <Divider className='my-2' />
                <RadioGroup
                    classNames={{
                        label: cn("text-black")
                    }}
                    label="Selecciona el medio de transporte"
                    color="primary"
                    defaultValue={data.transportes[0]}
                >
                    {data.transportes.map((item, idx) => (
                        <Radio key={`${item}-${idx}`} value={item} name={item} onChange={() => handleTransportCart(idx)}>{item}</Radio>
                    ))}
                </RadioGroup>
                <Divider className='my-2' />
                <div>
                    <span>Seleccione la fecha en que desea viajar</span>
                    <input type="date" name='date' required={true}
                        min={calculateDate('current')}
                        max={calculateDate('future', 6)}
                        value={tourDate}
                        onChange={handleDate}
                    />
                </div>
                <Divider className='my-2' />
                <div className='flex flex-col gap-2'>
                    {Object.entries(data.tours[sliderCart].precios).map(([key, value], idx) => (
                        value.tarifaBase > 0
                            ?
                            <InputsCart key={`${key}-${idx}`} handleClients={handleClients} category={key} tariff={value.descuento > 0 ? value.descuento : value.tarifaBase} />
                            : null
                    ))}
                </div>
            </div>
            <div className='flex flex-col items-center justify-center'>
                <div>
                    <span>Total:{numberSeparator(total)}</span>
                </div>
                <div className='w-full'>
                    <Button className="w-full h-12" type='submit' color="success" startContent={<Calendar style={"w-10 h-10"} />}>
                        Reservar
                    </Button>
                </div>
            </div>
        </form>
    )
}
