/* eslint-disable no-undef */
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

import { ProductModel } from "../../DB/Models/Product.model.js";
import { ApiError } from "../Utillis/apiErrors.js";

// @desc    Get list of products
// @route   GET api/v1/products
// @access  public
export const getProductsController = expressAsyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;

    let skip = (page - 1) * limit;
    const numberOfProducts = await ProductModel.countDocuments();
    if (numberOfProducts < skip || skip < 0) {
        page = 1;
        skip = 0;
    }
    const products = await ProductModel.find()
        .skip(skip)
        .limit(limit).sort({ createdAt: -1 })
        .populate({path: "category", select: "name -_id"})
        .populate({path: "subCategory", select: "name -_id"});

    res.status(200).send({
        meta: {
            total: numberOfProducts,
            results: products.length,
            currentPage: page,
            limit: limit,
        },
        data: products,
    });
});

// @desc    Create product
// @route   POST api/v1/products
// @access  private
export const postProductController = expressAsyncHandler(async (req, res) => {
    req.body.slug = slugify(req.body.title);

    // remove duplicates from subCategory array
    if(req.body.subCategory){
        req.body.subCategory = Array.of(...(new Set(req.body.subCategory)));
    }

    // make priceAfterDiscount default to price if not provided
    if (!req.body.priceAfterDiscount) {
        req.body.priceAfterDiscount = req.body.price;
    }

    const product = await ProductModel.create(req.body);
    res.status(201).send({ data: product });
});

// @desc    Get specific product by id
// @route   GET api/v1/products/{id}
// @access  public
export const getProductByIdController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        let product = await ProductModel.findById(id)
        .populate({path: "category", select: "name -_id"});

        if (!product) {
            return next(new ApiError(`product not found with id: ${id}`, 404));
        }

        res.status(200).send({ data: product });
    }
);

// @ desc   Update specific product
// @route   PUT api/v1/products/{id}
// @access  private
export const updateSpecificProductController = expressAsyncHandler(
    async (req, res) => {
        const { id } = req.params;

        if(req.body.title){
            req.body.slug = slugify(req.body.title);
        }

        const product = await ProductModel.findOneAndUpdate(
            { _id: id },
            req.body,
            { returnOriginal: false }
        );

        if (!product) {
            return next(new ApiError(`product not found with id: ${id}`, 404));
        }

        res.status(200).send({ data: product });
    }
);

// @desc    DELETE specific product with id
// @route   DELTE api/v1/products/{id}
// @access  private
export const deleteProductController = expressAsyncHandler(
    async (req, res, next) => {
        const { id } = req.params;

        const product = await ProductModel.findByIdAndDelete(id);

        if (!product) {
            return next(new ApiError(`product not found with id: ${id}`, 404));
        }
        res.status(204).send();
    }
);
