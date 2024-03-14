import UserIcon from '@/icons/userIcon';
import { Input } from '@nextui-org/react';
import React, { useState } from 'react'

export default function InputsCart({ category, tariff,handleClients }) {
    const clientsDefault = category === "general" || category === "adulto" ? 1 : 0
    const [numberClients, setNumberClients] = useState(clientsDefault)
    function setClients(e) {
        handleClients(category,tariff,e.target.value)
        setNumberClients(e.target.value)
    }
    return (
        <Input
            min={clientsDefault}
            max={100}
            onChange={setClients}
            type="number"
            label={category}
            placeholder={clientsDefault}
            value={numberClients}
            labelPlacement="outside"
            startContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">{<UserIcon style={'w-6 h-6'} />}</span>
                </div>
            }
        />
    )
}
