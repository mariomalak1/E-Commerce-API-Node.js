import { param, body } from "express-validator";

import validator from "../../Middlewares/valdator.middleware.js";

export const getCategoryValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];

export const postCategoryValidator = [
    body('name').notEmpty().withMessage("name is required")
        .isLength({ min: 3 }).withMessage("too short category name")
        .isLength({ max: 32 }).withMessage("too long category name"),
    validator
];

export const updateCategoryValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];

export const deleteCategoryValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];



