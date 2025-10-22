import express from "express";
import usersRoutes from '../server/src/routes/users.routes.js'
import productsRoutes from '../server/src/routes/products.routes.js'
import cartRoutes from '../server/src/routes/cart.routes.js'
import ordersRoutes from '../server/src/routes/orders.routes.js'
import { connectDB } from "../server/src/server/connectDB.js";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";
const app = express()


dotenv.config()


app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(cookieParser())

const PORT = process.env.PORT || 4000

connectDB()


app.use('/products', productsRoutes)
app.use('/users', usersRoutes)
app.use('/order', ordersRoutes )
app.use('/cart', cartRoutes)





app.listen(PORT, () => {
    console.log(`Escuchando en el puerto http://localhost:${PORT}`);
})
