export function extractData(data) {
    const purchaseUnit = data.purchase_units[0];
    const extractedData = {
        id: data.id,
        purchaseUnits:{
            amount: purchaseUnit.amount.value,
            items: purchaseUnit.items.map(item => ({
              name: item.name,
              value: item.unit_amount.value,
              quantity: item.quantity
            }))
          },
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
