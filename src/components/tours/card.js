"use client"
import { numberSeparator } from "@/utils/numberSeparator";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { DetailsTour } from "../datailsTour/detailsTour";
export default function CardTours({ item, idx }) {
    const [sliderIdx, setSliderIdx] = useState(0);
    function handleTransport(idx) {
        setSliderIdx(idx);
    }
    return (
        item &&
        <Card className="h-auto max-h-[900px] xl:max-w-96" shadow="sm" key={idx} onPress={() => null}>
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="w-full text-md text-left text-wrap pl-2">{`${idx + 1}. ${item.isla.isla}`}</p>
                </div>
            </CardHeader>
            <CardBody className="h-80 w-full lg:max-w-96">
                <Link className="h-full w-full relative hover:scale-95 ease-in duration-250" target="_blank" href={`/tour/${item._id}`}>
                    <Image
                        className="rounded-lg"
                        src={item.isla.img[0]}
                        alt={item.isla.isla}
                        fill={true}
                        priority={true}
                        quality={100}
                        sizes="(max-width: 768px) 100vw,700px"
                    />
                </Link>
            </CardBody>
            <CardFooter className="flex flex-col justify-center items-center w-full">
                <div className="w-full text-left mb-1" >
                    <ul className="space-y-2 *:flex *:gap-2">
                        <DetailsTour details={item.tours[sliderIdx].detalles} />
                    </ul>
                    <Divider className="my-4" />
                    <p className="min-h-14   w-full leading-7 line-clamp-2">{item.tours[sliderIdx].descripcion}</p>
                </div>
                <Divider className="my-1" />
                {/* transportes */}
                <div className="w-full flex flex-col justify-center text-center">
                    <h2 className="font-semibold">Transportes</h2>
                    <div className="w-full h-12 flex justify-center items-center gap-2">
                        {item.transportes.map((element, idx) => (
                            <React.Fragment key={`${element}-${idx}`}>
                                <Button
                                    color="primary" variant={sliderIdx === idx ? "shadow" : "flat"} onClick={() => handleTransport(idx)}>
                                    {element}
                                </Button>
                                {item.transportes.length > 1 && item.transportes.length != idx + 1
                                    ? <Divider orientation="vertical" />
                                    : null}

                            </React.Fragment>
                        ))}
                    </div>
                    <Divider className="my-2" />
                    {/* precios */}
                    <h1 className="font-semibold">Precios</h1>
                    {item.tours.length > 0 &&
                        <ul className="flex flex-row h-28 justify-center text-center gap-4 *:flex *:flex-col">
                            {Object.entries(item.tours[sliderIdx].precios).map(([key, value], idx) => (
                                value.tarifaBase > 0 && (
                                    <li key={`${key}-${idx}`}>
                                        {value.descuento > 0 ?
                                            <>
                                                <span className="font-semibold">{key}</span>
                                                <span className="text-white bg-red-500 tracking-wider line-through p-1 rounded-sm">&#8353;{numberSeparator(value.tarifaBase)}</span>
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
                    }
                    {/*Reservar*/}
                    <Divider className="my-2" />
                    <div className="w-full h-16 flex flex-row items-center justify-center">
                        <Link className="h-full w-full " target="_blank" href={`/tour/${item._id}`}>
                            <Button className="w-full h-12 text-white  text-lg" color="success">
                                Ver mas
                            </Button>
                        </Link>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}

