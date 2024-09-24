import {Router} from "express";

import {postCategoryController} from "../Controllers/Category.controller.js";

export const router = Router();

router.post("/", postCategoryController);
