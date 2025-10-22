import mongoose from "mongoose"



export const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('Conexion satisfactoria');
    } catch (err) {
        console.log('Error al conectarse a la base de datos')
    }
}