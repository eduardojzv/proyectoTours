import React from 'react'
import Clock from "@/icons/clock";
import Translate from "@/icons/traslate";
import UserGroup from "@/icons/userGroup";
export function DetailsTour({ details }) {
    const itemsDetails = [
        { icon: <UserGroup style="w-6 h-6" />, tag: 'Edades', val: details.edades },
        { icon: <Clock style="w-6 h-6" />, tag: 'Duración', val: details.duracion },
        { icon: <Translate style="w-6 h-6" />, tag: 'Guía', val: details.guia.join(',') }
    ];
    return (
        <>
            {itemsDetails.map((item, index) => (
                <li key={index}>
                    {item.icon}
                    <span className="font-bold">{item.tag}:</span>
                    <span>{item.val}</span>
                </li>
            ))}
        </>
    )
}
