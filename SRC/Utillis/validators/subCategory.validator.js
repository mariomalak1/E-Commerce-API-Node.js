import { param, body, validationResult } from "express-validator";
import validator from "../../Middlewares/valdator.middleware.js";

export const getSubCategoryByIdValidator = [
    param("id")
        .notEmpty()
        .withMessage("reqired subcategory id")
        .isMongoId()
        .withMessage("invalid mongo id format"),
    validator,
];

export const updateSubCategoryValidator = [
    param("id")
        .notEmpty()
        .withMessage("reqired subcategory id")
        .isMongoId()
        .withMessage("invalid mongo id format"),
    validator,
];

export const deleteSubCategoryValidator = [
    param("id")
        .notEmpty()
        .withMessage("reqired subcategory id")
        .isMongoId()
        .withMessage("invalid mongo id format"),
    validator,
];

export const postSubCategoryValidator = [
    body("name")
        .notEmpty()
        .withMessage("subcategory must have name")
        .isLength({ min: 2 })
        .withMessage("too short name")
        .isLength({ max: 32 })
        .withMessage("too long name"),

    body("category")
        .notEmpty()
        .withMessage("SubCategory must have category parent")
        .isMongoId()
        .withMessage("invalid mongo id format"),
    validator,
];
