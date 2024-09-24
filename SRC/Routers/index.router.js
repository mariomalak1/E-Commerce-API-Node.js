import {Router} from "express";

import {router as categoryRouter} from "./category.router.js"

export const router = Router();

router.use("/categories/", categoryRouter);
