import mongoose from "mongoose";


const connectDB = async  () => {
    const DB_URI = process.env.DB_URI;
        try {
            console.log("connecting to database..", DB_URI);
            await mongoose.connect(DB_URI);
            console.log("Database connected successfully");
        } catch (error) {
            console.error("Database connection failed:", error);
        }
};

export default connectDB;
