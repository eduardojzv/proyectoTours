"use client"
import { Accordion, Button, Divider, AccordionItem } from '@nextui-org/react';
import React, { useState } from 'react'
import SwiperComponent from '../swiper/swiper';
import Information from '@/icons/information';
import { numberSeparator } from '@/utils/numberSeparator';
import ReservationCard from '../reservationCard/reservationCard';
import { DetailsTour } from '../datailsTour/detailsTour';
export default function TourPage({ data }) {
    const [sliderImg, setSliderImg] = useState(0);
    const tourImages = data.isla.img.map(url => (
        {
            img: url
        }
    ));
    const transportImages = data.tours[sliderImg].transporte.img.map((url) => (
        {
            img: url,
        }
    ))
    function handleTransportImages(idx) {
        setSliderImg(idx);
    }
    return (
        <div className=''>
            {/* top */}
            <div className='w-full'>
                <h1 className='text-2xl'> Tour {data.isla.isla}</h1>
                <span className='text-2xl'>Ofrecido por: Green Zone</span>
            </div>
            {/*imagenes de galeria*/}
            <div className='w-full text-center'>
                <h1 className='text-xl text-white bg-green-500'>Imagenes del tour</h1>
                <SwiperComponent images={tourImages} />
            </div>

            {/*cols*/}
            <div className='text-center text-2xl bg-green-500 text-white my-4'>
                <h1>Informacion del tour</h1>
            </div>
            <div className='grid grid-cols-1  self-center lg:grid-cols-2 p-1'>
                {/*informacion*/}
                <div className='min-h-60 order-last lg:order-first'>
                    <div className='h-64 p-2'>
                        <h1 className='flex items-center gap-2'><Information style={"w-6 h-6"} /> Descripcion</h1>
                        <p className='leading-7'>{data.tours[sliderImg].descripcion}</p>
                    </div>
                    <div className="w-full text-left p-1" >
                        <ul className="space-y-2 *:flex *:gap-2">
                            <DetailsTour details={data.tours[sliderImg].detalles} />
                        </ul>
                        <Divider className="my-4" />
                        <div className='h-auto w-full'>
                            <Accordion selectionMode="multiple">
                                {Object.entries(data.tours[sliderImg].servicios).map(([key, value], idx) => (
                                    <AccordionItem key={idx} aria-label={`Accordion ${idx}`} title={key}>
                                        <ul className="list-disc">
                                            {value.map((item, index) => (
                                                <li key={`${key}-${index}`}>
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </div>
                    </div>
                </div>
                {/*transportes*/}
                <div className='h-full flex flex-col items-center justify-center gap-4'>
                    <div className='flex flex-col items-center'>
                        <h1>Transportes</h1>
                        <div className='flex flex-row gap-2'>
                            {data.transportes.map((element, idx) => (
                                <React.Fragment key={idx}>
                                    <Button
                                        color="primary" variant={sliderImg === idx ? "shadow" : "flat"} onClick={() => handleTransportImages(idx)}>
                                        {element}
                                    </Button>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                    <div className='w-full h-full'>
                        <SwiperComponent images={transportImages} />
                    </div>
                </div>
            </div>
            {/*Reservar*/}

            <div className='text-center text-2xl bg-green-500 text-white my-4'>
                <h1>Precios y Reservacion en <strong>{data.transportes[sliderImg]}</strong></h1>
            </div>
            <div className='grid gap-2 w-full justify-items-center grid-cols-1 lg:grid-cols-2 p-1'>
                <div className='w-full bg-white text-lg p-2 rounded-lg flex flex-col justify-center items-center gap-4  h-fit lg:w-2/4'>
                    <h1 className='text-2xl'>Tarifa</h1>
                    <Divider className="my-2" />
                    {data.tours.length > 0 &&
                        data.tours.map((tour, idxTour) => (
                            <React.Fragment key={idxTour}>
                                <strong>{tour.transporte.transporte}</strong>
                                <ul key={`tafica-${idxTour}`} className="flex flex-row h-36 justify-center text-center gap-4 *:flex *:flex-col">
                                    {Object.entries(tour.precios).map(([key, value], idxPrice) => (
                                        value.tarifaBase > 0 && (
                                            <li className='' key={`${key}-${idxPrice}`}>
                                                {value.descuento > 0 ?
                                                    <>
                                                        <span className="font-semibold">{key}</span>
                                                        <span className="text-white bg-red-500 tracking-wider line-through p-1 rounded-sm">&#8353;{numberSeparator(value.tarifaBase)}</span>
                                                        <Divider className='my-2' />
                                                        <span className="font-semibold">Oferta</span>
                                                        <span>&#8353;{numberSeparator(value.descuento)}</span>
                                                    </>
                                                    :
                                                    <>
                                                        <span className="font-semibold">{key}</span>
                                                        <span className="tracking-wider">&#8353;{numberSeparator(value.tarifaBase)}</span>

                                                    </>
                                                }
                                            </li>
                                        )
                                    ))}
                                </ul>
                                {(idxTour + 1) !== data.tours.length
                                    ? <Divider className="my-2" />
                                    : null
                                }
                            </React.Fragment>
                        ))
                    }
                </div>
                {/*Card reserva*/}
                <ReservationCard data={data} />
            </div>
        </div>

    )
}
