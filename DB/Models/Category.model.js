import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: String
});

export const CategoryModel = mongoose.model("Category", CategorySchema);
