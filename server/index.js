import express from "express";
import productsRoutes from '../server/routes/products.route.js'
import usersRoutes from '../server/routes/users.route.js'
import { connectDB } from "./server/connectDB.js";
import dotenv from 'dotenv'
const app = express()


dotenv.config()


app.use(express.json())

const PORT = 4000

connectDB()

app.get('/', (req, res) => {
    res.json({message: 'Hola mundo'})
})

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)





app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})
