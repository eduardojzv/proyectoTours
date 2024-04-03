"use client"
import Calendar from '@/icons/calendar';
import UserIcon from '@/icons/userIcon';
import { useReservationStore } from '@/storeZustand/reservationStore';
import { clientsQuantityText } from '@/utils/clientsQuantityText'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
export default function TourInformation() {
    const { reservation } = useReservationStore();
    const [data, setData] = useState({})
    const clientsQuantity = clientsQuantityText(data.clients)
    useEffect(() => {
        setData(reservation)
    }, [reservation])
    if (Object.keys(data).length === 0) return <div>Cargando</div>
    return (
        <>
            <div className='bg-red-200 w-full h-36 col-span-1 relative'>
                <Image
                    className="rounded-lg"
                    src={data.tourData?.islaImg}
                    alt=''
                    fill={true}
                    priority={true}
                    quality={100}
                    sizes="(max-width: 768px) 100vw,700px"
                />
            </div>
            <div className='col-span-3'>
                <h1>{data.tourData.titulo}</h1>
                <ul className="list-none">
                    <li className='flex flex-row gap-2'>{<UserIcon style={'w-6 h-6'} />} {clientsQuantity}</li>
                    <li className='flex flex-row gap-2'>{<Calendar style={'w-6 h-6'} />} {data.tourDate}</li>
                </ul>
            </div>
        </>
    )
}
