import {CategoryModel} from "../../DB/Models/Category.model.js";
import slugify from "slugify";

export async function postCategoryController(req, res){
    let name = req.body.name;

    CategoryModel.create({name, slug:slugify(name)})
        .then((category) => {
            res.status(201).send({"data":category})
        })
        .catch(err => {
            res.status(400).send(err);
        });
}