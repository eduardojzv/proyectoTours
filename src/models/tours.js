// import { model, Schema, models } from "mongoose";
// //transporte Schema
// const transporteSchema = new Schema({
//     transporte: { type: String, required: true },
//     img: { type: String, required: true }
// });
// //isla Schema
// const islaSchema = new Schema({
//     isla: { type: String, required: true },
//     img: { type: String, required: true }
// });
// // Tour esquema
// const tourSchema = new Schema({
//     transportes: [{ type: Schema.Types.ObjectId, ref: 'Transportes' }],
//     islas: { type: Schema.Types.ObjectId, ref: 'Islas' },
//     titulo: { type: String, required: true },
//     //operadorTuristico: { type: Schema.Types.ObjectId, ref: 'OperadorTuristico' },
//     descripcion: { type: String, required: true },
//     asientos: { type: Number, required: true },
//     precios: [{
//         transporte:{type:String,required:true},
//         general: { tarifaBase: Number, descuento: Number },
//         adulto: { tarifaBase: Number, descuento: Number },
//         niño: { tarifaBase: Number, descuento: Number },
//         bebe: { tarifaBase: Number, descuento: Number },
//     }],
//     avisos: [{ type: String, required: false }],
//     alimentacion: [{
//         tipo: { type: String, required: false }, // almuerzo, tarde, noche, etc.
//         alimentos: [{ type: String, required: false }],//arroz,frijoles,pescado
//         bebidas: [{ type: String, required: false }],//cocacola,te
//         extras: [{ type: String, required: false }] // extra pescado,extra carne,bebidas extras
//     }],
//     servicios: {
//         transporte: [{ type: String, required: false }],
//         alimentacion: [{ type: String, required: false }],
//         otros: [{ type: String, required: false }],
//         noIncluidos: [{ type: String, required: false }],
//     },
//     fecha:{ type: Date, required: true },
//     duracion: { type: String, required: true }
// })
// export const Islas = models.Islas || model('Islas', islaSchema);
// export const Transportes = models.Transportes || model('Transportes', transporteSchema);
// export const Tours = models.Tours || model('Tours', tourSchema);
//---------------------------------------------
import { model, Schema, models } from "mongoose";
//transporte Schema
const transporteSchema = new Schema({
    transporte: { type: String, required: true },
    img: [{ type: String, required: true }]
});
//isla Schema
const islaSchema = new Schema({
    isla: { type: String, required: true },
    img: [{ type: String, required: true }]
});
//reserva
const reservaSchema=new Schema({
    //tour: { type: Schema.Types.ObjectId, ref: 'Tours' },
    fecha:{type:Date,required:true},
    asientosReservados:{type:Number,required:true}
})
// Tour esquema
const tourSchema = new Schema({
    isla: { type: Schema.Types.ObjectId, ref: 'Islas' },
    transportes: [{ type: String, required: true }],
    tours: [{
        transporte: { type: Schema.Types.ObjectId, ref: 'Transportes' },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true },
        asientos: { type: Number, required: true },
        precios: {
            general: { tarifaBase: Number, descuento: Number },
            adulto: { tarifaBase: Number, descuento: Number },
            niño: { tarifaBase: Number, descuento: Number },
            bebe: { tarifaBase: Number, descuento: Number },
        },
        avisos: { type: String, required: false },
        alimentacion: [{
            tipo: { type: String, required: false }, // almuerzo, tarde, noche, etc.
            alimentos: [{ type: String, required: false }],//arroz,frijoles,pescado
            bebidas: [{ type: String, required: false }],//cocacola,te
            extras: [{ type: String, required: false }] // extra pescado,extra carne,bebidas extras
        }],
        servicios: {
            transporte: [{ type: String, required: false }],
            alimentacion: [{ type: String, required: false }],
            otros: [{ type: String, required: false }],
            noIncluidos: [{ type: String, required: false }],
        },
        detalles:{
            fecha: { type: Date, required: true },
            duracion: { type: String, required: true },
            edades:{type:String,required:true},
            guia:[{type:String,required:true}]
        }
    }],
})
// const tourSchema = new Schema({
//     isla: { type: Schema.Types.ObjectId, ref: 'Islas' },
//     tours:[{
//         transporte: { type: Schema.Types.ObjectId, ref: 'Transportes' },
//         titulo: { type: String, required: true },
//         descripcion: { type: String, required: true },
//         asientos: { type: Number, required: true },
//         precios:{
//             general: { tarifaBase: Number, descuento: Number },
//             adulto: { tarifaBase: Number, descuento: Number },
//             niño: { tarifaBase: Number, descuento: Number },
//             bebe: { tarifaBase: Number, descuento: Number },
//         },
//         avisos: { type: String, required: false },
//         alimentacion: [{
//             tipo: { type: String, required: false }, // almuerzo, tarde, noche, etc.
//             alimentos: [{ type: String, required: false }],//arroz,frijoles,pescado
//             bebidas: [{ type: String, required: false }],//cocacola,te
//             extras: [{ type: String, required: false }] // extra pescado,extra carne,bebidas extras
//         }],
//         servicios: {
//             transporte: [{ type: String, required: false }],
//             alimentacion: [{ type: String, required: false }],
//             otros: [{ type: String, required: false }],
//             noIncluidos: [{ type: String, required: false }],
//         },
//         fecha:{ type: Date, required: true },
//         duracion: { type: String, required: true }
//     }],
// })
export const Islas = models.Islas || model('Islas', islaSchema);
export const Transportes = models.Transportes || model('Transportes', transporteSchema);
export const Tours = models.Tours || model('Tours', tourSchema);
export const Reservas = models.Reservas || model('Reservas', reservaSchema);