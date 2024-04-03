import UserIcon from '@/icons/userIcon';
import { Input } from '@nextui-org/react';
export default function InputsCart({ handleClients, category, tariff }) {
    const defaultQuantity = (category === "general" || category === "adulto" ? 1 : 0)
    function handleQuantity(val) {
        handleClients(category, tariff, Number(val))
    }
    return (
        <Input
            min={defaultQuantity}
            max={100}
            onValueChange={handleQuantity}
            type="number"
            label={category}
            placeholder={defaultQuantity}
            defaultValue={defaultQuantity}
            labelPlacement="outside"
            startContent={
                <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">{<UserIcon style={'w-6 h-6'} />}</span>
                </div>
            }
        />
    )
}