import { Router } from "express";

import {
    getProductsController,
    postProductController,
    getProductByIdController,
    updateSpecificProductController,
    deleteProductController,
} from "../Controllers/Product.controller.js";

export const router = Router();

router.route("/")
    .get(getProductsController)
    .post(postProductController);

router
    .route("/:id/")
    .get(getProductByIdController)
    .put(updateSpecificProductController)
    .delete(deleteProductController);
