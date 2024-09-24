import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config({"path":"config.env"});

export const db = mongoose.connect(process.env.DB_URI)
    .then((conn)=>{
        console.log(`database is connected successfully ${conn.connection.host}`);
    })
    .catch((err)=>{
        console.error(err);
    });