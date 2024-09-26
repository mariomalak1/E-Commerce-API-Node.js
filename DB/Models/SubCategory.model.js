import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: [true, "subCategory is added before"],
            required: [true, "SubCategory must have name"],
            length: {
                minlength: [2, "too short subcategory name"],
                maxlength: [32, "too long subcategory name"],
            },
        },
        slug: {
            type: String,
            lowercase: true,
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: "Category",
            required: [true, "SubCategory must have category parent"],
        },
    },
    { timestamps: true }
);

const SubCategoryModel = mongoose.Model("SubCategory", subCategorySchema);

export default SubCategoryModel;
