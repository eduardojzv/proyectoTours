import { model, Schema, models } from "mongoose";
const facturaSchema = new Schema({
    _id: false,
    elementosComprados: {
        monto: { type: Number, required: true },
        productos: [
            {
                nombre: { type: String, required: true },
                valor: { type: Number, required: true },
                cantidad: { type: Number, required: true },
            }
        ]
    },
    pagador: {
        nombre: { type: String, required: true },
        apellidos: { type: String, required: true },
        correoElectronico: { type: String, required: true },
    }

})
export const Facturas = models.Facturas || model('Facturas', facturaSchema);
// const data = {
//     "order": {
//         "id": "3JU37906PB728442B",
//         "purchaseUnits": {
//             "amount": "50571.25",
//             "items": [
//                 {
//                     "name": "general ticket",
//                     "value": "50571.25",
//                     "quantity": "1"
//                 }
//             ]
//         },
//         "payer": {
//             "name": {
//                 "name": "pepe",
//                 "surname": "garcia"
//             },
//             "email_address": "sb-hc1up30001273@personal.example.com"
//         }
//     },
//     "contact": {
//         "name": "eduardo",
//         "lastName": "zamora",
//         "email": "carlos@gmail.com",
//         "phone": "62277838",
//         "state": true
//     }
// }