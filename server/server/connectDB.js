import mongoose from "mongoose"



export const connectDB = async () => {
    try {
        mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
        console.log('Conexion satisfactoria');
    } catch (err) {
        console.log('Error al conectarse a la base de datos')
    }
}