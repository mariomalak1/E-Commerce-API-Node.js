import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "category name is required"],
        unique: [true, "category name must be unique"],
        minLength: [3, "too short category name"],
        maxLength: [36, "too long category name"]
    },
    slug:{
        type: String,
        lowercase: true
    }
}, {timestamps: true});

export const CategoryModel = mongoose.model("Category", CategorySchema);
