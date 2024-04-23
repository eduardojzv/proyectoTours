// export function truncDecimals(number) {
//     const roundedNumber = Math.round(number * 4) / 4; // Redondea al múltiplo de 0.25 más cercano
//     return Number(roundedNumber.toFixed(2)); // Limita el resultado a dos decimales
// }

import { truncDecimals } from "./truncDecimals";

export function transformToPayPalFormat(data) {
    const exchangeRate = 503.25; // Tasa de cambio de colones a dólares
    let purchaseUnits = [];
    const items=[]
    let total=0
    // Iterar sobre cada tipo de producto en los datos
    Object.keys(data).forEach(type => {
        total+=truncDecimals(data[type].tariff / exchangeRate)*parseInt(data[type].quantity)
        items.push(
            {
                name: `${type} ticket`,
                quantity: data[type].quantity.toString(),
                unit_amount: {
                    currency_code: "USD",
                    value: truncDecimals(data[type].tariff / exchangeRate) // Convertir el precio unitario a decimal de dos lugares
                }
            }
        )
    });
    let product = {
        amount: {
            currency_code: "USD",
            value: total.toFixed(2), 
            breakdown: {
                item_total: {
                    currency_code: "USD",
                    value:total
                }
            }
        }
    };
    product.items=items
    purchaseUnits.push(product);
    return purchaseUnits
}
