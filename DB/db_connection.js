import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.DB_URI)
    .then((conn)=>{
        console.log(`database is connected successfully ${conn.connection.host}`);
    })
}