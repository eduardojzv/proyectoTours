"use client"
import Clock from '@/icons/clock';
import Traslate from '@/icons/traslate';
import UserGroup from '@/icons/userGroup';
import { Accordion, Button, Divider, AccordionItem, Card, CardHeader, CardBody, CardFooter, RadioGroup, Radio, Input } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import SwiperComponent from '../swiper/swiper';
import Information from '@/icons/information';
import { numberSeparator } from '@/utils/numberSeparator';
import InputsCart from '../inputsCart.js/inputsCart';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
const clientId=process.env.NEXT_PUBLIC_PAYPAL_CLIENTID
export default function TourPage({ data }) {
    const [sliderCart, setSliderCart] = useState(0);
    const generalPrices = data.tours[sliderCart].precios.general;
    const adultPrices = data.tours[sliderCart].precios.adulto;
    const prices = generalPrices.tarifaBase > 0 ? generalPrices : adultPrices;
    const [sliderImg, setSliderImg] = useState(0);
    const [total, setTotal] = useState(0)
    const [clients, setClients] = useState({})
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
    function handleTransportCart(idx) {
        setSliderCart(idx);
        setClients({})
    }
    function handleClients(client, tariff, quantity) {
        const updatedClients = { ...clients };
        if (quantity > 0) {
            updatedClients[client] = {
                quantity,
                tariff
            };
        } else {
            delete updatedClients[client];
        }
        setClients(updatedClients);
    }



    useEffect(() => {
        let defaultPrice = 0
        if (Object.keys(clients).length === 0) {
            defaultPrice = prices.descuento > 0 ? prices.descuento : prices.tarifaBase;
        }
        console.log("default", defaultPrice);
        const newTotal = Object.values(clients).reduce((acc, currentValue) => acc + (currentValue.quantity * currentValue.tariff), 0);
        setTotal(newTotal + defaultPrice);
    }, [prices, clients]);


    return (
        <div className=''>
            {/* top */}
            <div className='w-full'>
                <h1> Tour {data.isla.isla}</h1>
                <span>Ofrecido por: Green Zone</span>
            </div>
            {/*imagenes de galeria*/}
            <div className='w-full text-center p-1'>
                <h1 className='text-xl'>Imagenes del tour</h1>
                <SwiperComponent images={tourImages} />
            </div>
            <Divider className="my-4" />
            {/*cols*/}
            <div className='text-center text-2xl bg-slate-600 text-white'>
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
                            <li>
                                <UserGroup style={'w-6 h-6'} />
                                <span>Edades:{data.tours[sliderImg].edades}</span>
                            </li>
                            <li>
                                <Clock style={'w-6 h-6'} />
                                <span>
                                    Duracion: {data.tours[sliderImg].duracion}
                                </span>
                            </li>
                            <li>
                                <Traslate style={'w-6 h-6'} />
                                <span> Guia:Ingles, Español</span>
                            </li>
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
            <Divider className="my-4" />
            {/*Reservar*/}
            <div className='text-center text-2xl bg-slate-600 text-white'>
                <h1>Precios y Reservacion en <strong>{data.transportes[sliderImg]}</strong></h1>
            </div>
            <div className='grid gap-2 justify-items-center grid-cols-1 lg:grid-cols-2 p-1'>
                <div className='bg-white text-lg p-2 rounded-lg flex flex-col justify-center items-center gap-4 max-w-96'>
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
                <Card className="max-w-96">
                    <CardHeader className="flex justify-center gap-3">
                        <div className="flex flex-col items-center justify-center">
                            <p className="text-lg">Reserve su asiento</p>
                        </div>
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <p className='flex flex-row gap-2 font-bold'><Information style={"w-8 h-8"} />El precio general es el precio por persona sin importar edad o estado</p>
                        <Divider className='my-2' />
                        <RadioGroup

                            label="Selecciona el medio de transporte"
                            color="primary"
                            defaultValue={data.transportes[0]}
                        >
                            {data.transportes.map((item, idx) => (
                                <Radio key={`${item}-${idx}`} value={item} onChange={() => handleTransportCart(idx)}>{item}</Radio>
                            ))}
                        </RadioGroup>
                        <Divider className='my-2' />
                        <div className='flex flex-col gap-2'>
                            {Object.entries(data.tours[sliderCart].precios).map(([key, value], idx) => (
                                value.tarifaBase > 0
                                    ?

                                    <InputsCart key={`${key}-${idx}`} handleClients={handleClients} category={key} tariff={value.descuento > 0 ? value.descuento : value.tarifaBase} />
                                    : null
                            ))}
                        </div>
                    </CardBody>
                    <CardFooter className='flex flex-col items-center justify-center'>
                        <div>
                            <span>Total:{numberSeparator(total)}</span>
                        </div>
                        <PayPalScriptProvider options={{
                            clientId:clientId
                        }}>
                            <PayPalButtons
                                // style={{
                                //     color: "gold",
                                //     layout: "horizontal"
                                // }}
                                createOrder={async() => {
                                    const res=await fetch('/api/checkout',{
                                        method:"POST"
                                    })
                                    const order=await res.json()
                                    return order.id
                                }}
                                onApprove={(data,actions)=>{
                                    console.log("data",data);
                                    actions.order.capture().then((orderData)=>{
                                        console.log("orderData",orderData);

                                    })
                                }}
                                onCancel={()=> null}
                            />
                        </PayPalScriptProvider>
                    </CardFooter>
                </Card>
            </div>
        </div>

    )
}
