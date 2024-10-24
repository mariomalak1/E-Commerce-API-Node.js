import { Router } from "express";

import { router as categoryRouter } from "./category.router.js";
import { router as subCategoryRouter } from "./subCategory.route.js";
import { router as brandsRouter } from "./brand.router.js";
import { router as productRouter } from "./product.router.js";

export const router = Router();

router.use("/categories/", categoryRouter);
router.use("/subCategories/", subCategoryRouter);
router.use("/brands/", brandsRouter);
router.use("/products/", productRouter);
