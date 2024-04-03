import mongoose from 'mongoose'
// URI de conexión a tu base de datos MongoDB
const MONGODB_URI = process.env.MONGO_URI;
// Establecer conexión a la base de datos
export async function connectDB() {
  mongoose.connect(MONGODB_URI)
    .then(() => {
      console.log('Conexión a MongoDB establecida correctamente');
    })
    .catch((error) => {
      console.error('Error al conectar a MongoDB:', error);
    });

}
// Manejo de eventos de conexión
mongoose.connection.on('connected', () => {
  console.log("Mongoose está conectado a la base de datos:", mongoose.connection.db.databaseName);
});

mongoose.connection.on('error', (error) => {
  console.error('Error en la conexión a MongoDB:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Conexión a MongoDB cerrada');
});

// Exportar la instancia de mongoose (opcional)
export default mongoose
