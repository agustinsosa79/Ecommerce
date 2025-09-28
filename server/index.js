import express from "express";
import {z} from "zod"
import productsRoutes from '../server/routes/products.route.js'
import { connectDB } from "./server/connectDB.js";

const app = express()


app.use(express.json())

const PORT = 4000

connectDB()

app.get('/', (req, res) => {
    res.json({message: 'Hola mundo'})
})

app.use('/products', productsRoutes)





app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})
