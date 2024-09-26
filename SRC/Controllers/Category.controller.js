import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

import {CategoryModel} from "../../DB/Models/Category.model.js";
import {ApiError} from "../Utillis/apiErrors.js";
import {messageResponse} from "../Utillis/messagesResponse.js";


// @desc    Get list of categories
// @route   GET api/v1/categories
// @access  private
export const getCategoryController = expressAsyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 10;

    let skip = (page - 1) * limit;
    const numberOfCategories = await CategoryModel.countDocuments();
    if(numberOfCategories < skip || skip < 0 ){
        page = 1;
        skip = 0;
    }
    const categories = await CategoryModel.find().skip(skip).limit(limit);
    res.status(200).send({
        meta:{
            results:categories.length,
            currentPage:page,
            limit:limit,
        },
        data:categories
    });
});

// @desc    Create category
// @route   POST api/v1/categories
// @access  private
export const postCategoryController = expressAsyncHandler(async (req, res, next) => {
    let name = req.body.name;
    const category = await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).send({"data":category})
});

// @desc    Get specific category by id
// @route   GET api/v1/categories/{id}
// @access  public
export const getCategoryByIdController = expressAsyncHandler(async (req, res, next) =>{
    const {id} = req.params;

    let category = await CategoryModel.findById(id);

    if(!category){
        return next(new ApiError(`category not found with id: ${id}`, 404));
    }

    res.status(200).send({data:category});
});

// @ desc   Update specific category
// @route   PUT api/v1/categories/{id}
// @access  private
export const updateSpecificCategoryController = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    if(!name){
        return next(new ApiError("name is required", 400));
        // res.status(400).send({"msg": ""});
    }
    const category = await CategoryModel.findOneAndUpdate(
        {_id: id}, 
        {name, slug: slugify(name)},
        {returnOriginal: false}
    );

    if(!category){
        return next(new ApiError(`category not found with id: ${id}`, 404));
    }

    res.status(200).send({data: category});
});


// @desc    DELETE specific category with id
// @route   DELTE api/v1/categories/{id}
// @access  private
export const deleteCategoryController = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;

    const category = await CategoryModel.findByIdAndDelete(id);
    
    if(!category){
        return next(new ApiError(`category not found with id: ${id}`, 404));
    }

    res.status(204).send();
});