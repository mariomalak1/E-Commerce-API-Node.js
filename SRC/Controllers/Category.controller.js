import {CategoryModel} from "../../DB/Models/Category.model.js";
import expressAsyncHandler from "express-async-handler";
import slugify from "slugify";

export let postCategoryController = expressAsyncHandler(async (req, res) => {
    let name = req.body.name;
    const category = await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).send({"data":category})
});