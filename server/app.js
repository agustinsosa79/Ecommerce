import express from 'express';
import connectDB from './config/db.config.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();


console.log(process.env.DB_URI);


const app = express();
const PORT = 5000;

connectDB();


app.use(cookieParser())

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`)
})