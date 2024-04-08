export function extractData(data) {
    const extractedData = {
        id: data.id,
        purchase_units: data.purchase_units.map(unit => ({
            amount: unit.amount.value,
            items: unit.items.map(item => ({
                name: item.name,
                value: item.unit_amount.value,
                quantity: item.quantity
            }))
        })),
        payer: {
            name: {
                given_name: data.payer.name.given_name,
                surname: data.payer.name.surname
            },
            email_address: data.payer.email_address
        }
    };
    return extractedData;
}
