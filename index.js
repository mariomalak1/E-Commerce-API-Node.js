import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

import {db} from "./DB/db_connection.js";
import {router as apiRouter} from "./SRC/Routers/index.router.js";

dotenv.config({"path":"config.env"});

const app = Express();

// middlewares
app.use(Express.json());

if(process.env.ENV_MODE === "development"){
    app.use(morgan("dev"));
    mongoose.set('debug', true);
}

// mount routes
app.use("/api/v1", apiRouter);

// run app
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
