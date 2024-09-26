import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";
import mongoose from "mongoose";

import {CategoryModel} from "../../DB/Models/Category.model.js";


// @desc    Get list of categories
// @route   GET api/v1/categories
// @access  private
export const getCategoryController = expressAsyncHandler(async (req, res) => {
    let page = req.query.page * 1 || 1;
    let limit = req.query.limit * 1 || 1;

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
export const postCategoryController = expressAsyncHandler(async (req, res) => {
    let name = req.body.name;
    const category = await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).send({"data":category})
});

// @desc    Get specific category by id
// @route   GET api/v1/categories/{id}
// @access  public
export const getCategoryByIdController = expressAsyncHandler(async (req, res) =>{
    const {id} = req.params;
    
    // check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ "msg": "Invalid category ID" });
    }

    let category = await CategoryModel.findById(id);

    if(!category){
        res.status(404).send({"msg": "category not found"});
    }
    res.status(200).send({data:category});
});

// @ desc   Update specific category
// @route   PUT api/v1/categories/{id}
// @access  private
export const updateSpecificCategory = expressAsyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name} = req.body;
    
    if(!name){
        res.status(400).send({"msg": "name is required"});
    }

    // check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ "msg": "Invalid category ID" });
    }

    const category = await CategoryModel.findOneAndUpdate(
        {_id: id}, 
        {name, slug: slugify(name)},
        {returnOriginal: false}
    );
    console.log(category);
    if(!category){
        res.status(404).send({"msg":"not found category"});
    }
    res.status(200).send({data: category});
});