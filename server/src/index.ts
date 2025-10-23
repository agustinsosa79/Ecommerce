import express from "express";
import usersRoutes from './routes/users.routes.js'
import productsRoutes from './routes/products.routes.js'
import cartRoutes from './routes/cart.routes.js'
import ordersRoutes from './routes/orders.routes.js'
import { connectDB } from "./server/connectDB.js";
//@ts-ignore
import cors from 'cors'
import dotenv from 'dotenv'
//@ts-ignore
import cookieParser from "cookie-parser";
const app = express()


dotenv.config()


app.use(express.json())
app.use(cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:5173'],
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
