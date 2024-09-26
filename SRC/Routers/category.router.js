import {Router} from "express";

import {getCategoryController, postCategoryController,
     getCategoryByIdController, updateSpecificCategoryController,
     deleteCategoryController} from "../Controllers/Category.controller.js";

export const router = Router();

router.route("/").get(getCategoryController).post(postCategoryController);
router.route("/:id/").get(getCategoryByIdController).put(updateSpecificCategoryController).delete(deleteCategoryController);