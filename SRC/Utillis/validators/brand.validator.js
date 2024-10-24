import { param, body } from "express-validator";

import validator from "../../Middlewares/valdator.middleware.js";

export const getBrandValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];

export const postBrandValidator = [
    body('name').notEmpty().withMessage("name is required")
        .isLength({ min: 2 }).withMessage("too short brand name")
        .isLength({ max: 32 }).withMessage("too long brand name"),
    validator
];

export const updateBrandValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];

export const deleteBrandValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator
];



