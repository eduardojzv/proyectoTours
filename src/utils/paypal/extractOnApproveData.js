import { truncDecimals } from "./truncDecimals";

export function extractData(data) {
    const purchaseUnit = data.purchase_units[0];
    const extractedData = {
        id: data.id,
        detalle: [purchaseUnit.items.map((item, idx) => ({
            cantidad: item.quantity,
            descripcion: item.name,
            id_articulo: idx,
            iva: 0,
            precio: item.unit_amount.value,
            total_linea: truncDecimals(item.unit_amount.value*item.quantity)
        }))
        ],
        // payer: {
        //     name: {
        //         name: data.payer.name.given_name,
        //         surname: data.payer.name.surname
        //     },
        //     email_address: data.payer.email_address
        // }
    };
    return extractedData;
}
