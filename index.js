import Express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config({"path":"config.env"});

import {dbConnetion} from "./DB/db_connection.js";
import {ApiError} from "./SRC/Utillis/apiErrors.js";
import globalErrorHanddle from "./SRC/Middlewares/globalErrorHanddle.js"
import {router as apiRouter} from "./SRC/Routers/index.router.js";

dbConnetion();

const app = Express();

// middlewares
app.use(Express.json());

if(process.env.ENV_MODE === "development"){
    app.use(morgan("dev"));
    mongoose.set('debug', true);
}

// mount routes
app.use("/api/v1", apiRouter);

// handdle invalid routers
app.use("*", (req, res, next) => {
    next(new ApiError("invalid route", 404));
});


// express error handdler
app.use(globalErrorHanddle);


// run app
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
