/* eslint-disable no-undef */
import dotenv from "dotenv";
import Express from "express";
import mongoose from "mongoose";
import morgan from "morgan";

dotenv.config({ path: "config.env" });

import { dbConnetion } from "./DB/db_connection.js";
import globalErrorHandle from "./SRC/Middlewares/globalErrorHanddle.middleware.js";
import { router as apiRouter } from "./SRC/Routers/index.router.js";
import { ApiError } from "./SRC/Utillis/apiErrors.js";

dbConnetion();

const app = Express();

// middlewares
app.use(Express.json());

if (process.env.ENV_MODE === "development") {
    app.use(morgan("dev"));
    mongoose.set("debug", true);
}

// mount routes
app.use("/api/v1", apiRouter);

// handle invalid routers
app.use("*", (req, res, next) => {
    next(new ApiError("invalid route", 404));
});

// express error handler
app.use(globalErrorHandle);

// run app
const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

// handle errors outside express
process.on("unhandledRejection", (err) => {
    console.log(`${err.name} | ${err.message}`);

    // close the program after finish all requests
    server.close(() => {
        process.exit(1);
    });
});
