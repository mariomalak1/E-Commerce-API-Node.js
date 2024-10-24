import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

import SubCategoryModel from "../../DB/Models/SubCategory.model.js";
import { ApiError } from "../Utillis/apiErrors.js";

// @desc    Get list of subCategories
// @route   GET api/v1/subCategories
// @access  public
export const getSubCategoryController = expressAsyncHandler(
    async (req, res) => {
        let page = req.query.page * 1 || 1;
        let limit = req.query.limit * 1 || 10;

        let skip = (page - 1) * limit;
        const numberOfSubCategories = await SubCategoryModel.countDocuments();
        if (numberOfSubCategories < skip || skip < 0) {
            page = 1;
            skip = 0;
        }

        let filterObject = {};
        // if categoryId passed will return all subCategories of this category id
        if(req.params.categoryId){
            filterObject.category = req.params.categoryId;
        }

        const subCategories = await SubCategoryModel.find(filterObject)
            .skip(skip)
            .limit(limit)
            // make new query to database to make populate
            .populate({path: "category", select: "name createdAt -_id"});

        res.status(200).send({
            meta: {
                results: subCategories.length,
                currentPage: page,
                limit: limit,
            },
            data: subCategories,
        });
    }
);

// @desc    Create subCategory
// @route   POST api/v1/subCategories
// @access  private
export const postSubCategoryController = expressAsyncHandler(
    async (req, res) => {
        const { name, category } = req.body;

        const subCategory = await SubCategoryModel.create({
            name,
            category,
            slug: slugify(name),
        });

        res.status(201).send({ data: subCategory });
    }
);

// @desc    Get specific subCategory by id
// @route   GET api/v1/subCategories/{id}
// @access  public
export const getSubCategoryByIdController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        let subCategory = await SubCategoryModel.findById(id);

        if (!subCategory) {
            return next(
                new ApiError(`subCategory not found with id: ${id}`, 404)
            );
        }

        res.status(200).send({ data: subCategory });
    }
);

// @ desc   Update specific subCategory
// @route   PUT api/v1/subCategories/{id}
// @access  private
export const updateSpecificSubCategoryController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const { name, category } = req.body;

        const subCategory = await SubCategoryModel.findOneAndUpdate(
            { _id: id },
            { name, slug: slugify(name), category },
            { returnOriginal: false }
        );

        if (!subCategory) {
            return next(
                new ApiError(`subCategory not found with id: ${id}`, 404)
            );
        }

        res.status(200).send({ data: subCategory });
    }
);

// @desc    DELETE specific subCategory with id
// @route   DELTE api/v1/subCategories/{id}
// @access  private
export const deleteSubCategoryController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const subCategory = await SubCategoryModel.findByIdAndDelete(id);

        if (!subCategory) {
            return next(
                new ApiError(`subCategory not found with id: ${id}`, 404)
            );
        }

        res.status(204).send();
    }
);
