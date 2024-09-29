import { Router } from "express";

import {
    getSubCategoryByIdValidator,
    postSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} from "../Utillis/validators/subCategory.validator.js";

import {
    getSubCategoryController,
    postSubCategoryController,
    getSubCategoryByIdController,
    updateSpecificSubCategoryController,
    deleteSubCategoryController,
} from "../Controllers/subCategory.controller.js";

export const router = Router();

router
    .route("/")
    .get(getSubCategoryController)
    .post(postSubCategoryValidator, postSubCategoryController);

router
    .route("/:id")
    .get(getSubCategoryByIdValidator, getSubCategoryByIdController)
    .put(updateSubCategoryValidator, updateSpecificSubCategoryController)
    .delete(deleteSubCategoryValidator, deleteSubCategoryController);
