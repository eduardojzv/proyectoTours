const transporteSchema = new Schema({
    transporte: { type: String, required: true },
    img:{type:String,required:true}
});
export const Transportes = models.Transportes || model('Transportes', transporteSchema);