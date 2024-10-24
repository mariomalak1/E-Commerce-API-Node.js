import { Router } from "express";

import {
    getProductValidator,
    postProductValidator,
    updateProductValidator,
    deleteProductValidator,
} from "../Utillis/validators/product.validator.js";

import {
    getProductsController,
    postProductController,
    getProductByIdController,
    updateSpecificProductController,
    deleteProductController,
} from "../Controllers/Product.controller.js";

export const router = Router();

router.route("/").get(getProductsController).post(postProductValidator, postProductController);

router
    .route("/:id/")
    .get(getProductValidator, getProductByIdController)
    .put(updateProductValidator, updateSpecificProductController)
    .delete(deleteProductValidator, deleteProductController);
