/* eslint-disable no-undef */
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

import { BrandModel } from "../../DB/Models/Brand.model.js";
import { ApiError } from "../Utillis/apiErrors.js";

// @desc    Get list of brands
// @route   GET api/v1/brands
// @access  private
export const getBrandController = expressAsyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;

    let skip = (page - 1) * limit;
    const numberOfBrands = await BrandModel.countDocuments();
    if (numberOfBrands < skip || skip < 0) {
        page = 1;
        skip = 0;
    }
    const brands = await BrandModel.find().skip(skip).limit(limit);
    res.status(200).send({
        meta: {
            total: numberOfBrands,
            results: brands.length,
            currentPage: page,
            limit: limit,
        },
        data: brands,
    });
});

// @desc    Create brands
// @route   POST api/v1/brands
// @access  private
export const postBrandController = expressAsyncHandler(
    async (req, res, next) => {
        let name = req.body.name;
        const brands = await BrandModel.create({
            name,
            slug: slugify(name),
        });
        res.status(201).send({ data: brands });
    }
);

// @desc    Get specific brands by id
// @route   GET api/v1/brands/{id}
// @access  public
export const getBrandByIdController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        let brands = await BrandModel.findById(id);

        if (!brands) {
            return next(new ApiError(`brands not found with id: ${id}`, 404));
        }

        res.status(200).send({ data: brands });
    }
);

// @ desc   Update specific brands
// @route   PUT api/v1/brands/{id}
// @access  private
export const updateSpecificBrandController = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;
        const { name } = req.body;

        if (!name) {
            return next(new ApiError("name is required", 400));
            // res.status(400).send({"msg": ""});
        }
        const brands = await BrandModel.findOneAndUpdate(
            { _id: id },
            { name, slug: slugify(name) },
            { returnOriginal: false }
        );

        if (!brands) {
            return next(new ApiError(`brands not found with id: ${id}`, 404));
        }

        res.status(200).send({ data: brands });
    }
);

// @desc    DELETE specific brands with id
// @route   DELTE api/v1/brands/{id}
// @access  private
export const deleteBrandController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const brands = await BrandModel.findByIdAndDelete(id);

        if (!brands) {
            return next(new ApiError(`brands not found with id: ${id}`, 404));
        }

        res.status(204).send();
    }
);
