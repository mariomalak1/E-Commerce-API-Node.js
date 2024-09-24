import {CategoryModel} from "../../DB/Models/Category.model.js";

export async function postCategoryController(req, res){
    let name = req.body.name;

    if(!name){
        res.status(400).send({"msg":"name is required"});
    }

    const category = new CategoryModel({ name });

    category.save()
        .then((doc) => {
            res.status(200).send(doc);
        })
        .catch((err) => {
            console.error("Error saving category:", err);
            res.status(500).send({ "msg": "Internal Server Error", "error": err.message });
        });
}