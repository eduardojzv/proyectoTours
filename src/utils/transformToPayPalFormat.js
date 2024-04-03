function truncDecimals(number) {
    return Number(number.toFixed(2));
}
export function transformToPayPalFormat(data) {
    const exchangeRate = 503.25; // Tasa de cambio de colones a dólares
    let purchaseUnits = [];
    const items=[]
    let total=0
    // Iterar sobre cada tipo de producto en los datos
    Object.keys(data).forEach(type => {
        total=+truncDecimals(data[type].tariff / exchangeRate)*parseInt(data[type].quantity)
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
            value: total, 
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
