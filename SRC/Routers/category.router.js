import {Router} from "express";

import {getCategoryValidator, postCategoryValidator,
     updateCategoryValidator, deleteCategoryValidator
} from "../Utillis/validators/category.validator.js";

import {getCategoryController, postCategoryController,
     getCategoryByIdController, updateSpecificCategoryController,
     deleteCategoryController} from "../Controllers/Category.controller.js";

import { getSubCategoryController } from "../Controllers/subCategory.controller.js";

export const router = Router();

router.use("/:categoryId/subCategories/", getSubCategoryController)

router.route("/")
.get(getCategoryController)
.post(postCategoryValidator, postCategoryController);

router.route("/:id/")
.get(getCategoryValidator, getCategoryByIdController)
.put(updateCategoryValidator, updateSpecificCategoryController)
.delete(deleteCategoryValidator, deleteCategoryController);