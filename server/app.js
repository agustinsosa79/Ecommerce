import express from 'express';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import  authRouter  from './routes/auth.route.js';
dotenv.config();


console.log(process.env.DB_URI);


const app = express();
const PORT = 5000;

connectDB();

app.use(express.json())

app.use(cookieParser())
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})