import {Router} from "express";

import {getCategoryController, postCategoryController,
     getCategoryByIdController, updateSpecificCategory} from "../Controllers/Category.controller.js";

export const router = Router();

router.route("/").get(getCategoryController).post(postCategoryController);
router.route("/:id/").get(getCategoryByIdController).put(updateSpecificCategory);