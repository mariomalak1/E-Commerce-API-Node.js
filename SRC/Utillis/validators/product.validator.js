import { param, check} from "express-validator";

import validator from "../../Middlewares/valdator.middleware.js";

import {CategoryModel} from "../../../DB/Models/Category.model.js";
import SubCategoryModel from "../../../DB/Models/SubCategory.model.js";

export const getProductValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator,
];

export const postProductValidator = [
    check("title")
        .notEmpty()
        .withMessage("title is required")
        .isLength({ min: 2 })
        .withMessage("too short product name")
        .isLength({ max: 128 })
        .withMessage("too long product name"),

    check("imageCover")
        .notEmpty()
        .withMessage("must provide main cover image for product"),

    check("price")
        .notEmpty()
        .withMessage("price is required")
        .isNumeric()
        .withMessage("price must be a number")
        .toFloat(),

    check("quantity")
        .notEmpty()
        .withMessage("quantity is required")
        .isNumeric()
        .withMessage("quantity must be a number"),

    check("description")
        .notEmpty()
        .withMessage("product must have description")
        .isLength({ min: 5, max: 2000 }),

    check("category")
        .notEmpty()
        .withMessage("product must have category")
        .isMongoId()
        .withMessage("invalid mongo id for category")
        .custom(async value => {
            const category = await CategoryModel.findById(value);
            if (!category) {
              throw new Error('no category with this id');
            }
          }),

    check("brand")
        .optional()
        .isMongoId()
        .withMessage("invalid mongo id for brand"),

    check("subCategory")
        .optional()
        .isMongoId()
        .withMessage("invalid mongo id for subCategory")
        .custom(async (value, {req})=>{
            const subCategory = await SubCategoryModel.findById(value);
            
            if(!subCategory){
                throw new Error("no subcategory with this id");
            }

            // check if subcategory is in the same category as the product
            else{
                if(subCategory.category.toString() !== req.body.category){
                    throw new Error("must provide subcategory for this category");
                }
            }
            return true;
        }),

    check("colors").optional().isArray().withMessage("colors must be in array"),

    check("images").optional().isArray().withMessage("provide list of images"),

    check("priceAfterDiscount")
        .optional()
        .isNumeric()
        .withMessage("discount must be a number")
        .toFloat()
        .custom((value, { req }) => {
            if (value >= req.body.price) {
                throw new Error(
                    "priceAfterDiscount must less than the real price"
                );
            }
            return true;
        }),

    check("sold")
        .optional()
        .isNumeric()
        .withMessage("sold number must be a number"),

    check("ratingAverage")
        .optional()
        .isNumeric()
        .withMessage("ratingAverage must be decimal number")
        .isLength({ min: 1 })
        .withMessage("rating must be atleast 1")
        .isLength({ max: 5 })
        .withMessage("rating must be atmost 5")
        .toFloat(),

    check("ratingCount")
        .optional()
        .toInt()
        .isLength({ min: 0 })
        .withMessage("ratingCount minimum number is 0"),
    validator,
];

export const updateProductValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator,
];

export const deleteProductValidator = [
    param("id").isMongoId().withMessage("invalid mongo id format"),
    validator,
];