import mongoose from "mongoose";

import * as dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

export default connectDB;