import mongoose from "mongoose";

export const dbConnetion = () => {
    mongoose.connect(process.env.DB_URI)
    .then((conn)=>{
        console.log(`database is connected successfully ${conn.connection.host}`);
    })
}