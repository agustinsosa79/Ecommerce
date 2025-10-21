import express from "express";
import usersRoutes from '../server/routes/users.routes.js'
import productsRoutes from '../server/routes/products.routes.js'
import cartRoutes from '../server/routes/cart.routes.js'
import ordersRoutes from '../server/routes/orders.routes.js'
import { connectDB } from "./server/connectDB.js";
import cors from 'cors'
import dotenv from 'dotenv'
const app = express()


dotenv.config()


app.use(express.json())

const PORT = 4000

connectDB()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/order', ordersRoutes )
app.use('/cart', cartRoutes)





app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})
