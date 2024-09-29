import { Router } from "express";

import { router as categoryRouter } from "./category.router.js";
import { router as subCategoryRouter } from "./subCategory.route.js";

export const router = Router();

router.use("/categories/", categoryRouter);
router.use("/subCategories/", subCategoryRouter);
