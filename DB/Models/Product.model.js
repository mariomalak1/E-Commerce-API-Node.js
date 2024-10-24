import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title is required"],
        minLength: [2, "title length is too short"],
        maxLength: [128, "title length is too long"],
    },
    slug:{
        type: String,
        lowercase: true,
    },
    imageCover: {
        type: String,
        required: [true, "imageCover is required"],
    },
    images: [String],
    price:{
        type: Number,
        required: [true, "price is required"],
        min: [0, "price must be more than zero"],
    },
    description: {
        type: String,
        required: [true, "description is required"],
        minLength: [5, "description length is too short"],
        maxLength: [2000, "description length is too long"],
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "category is required"],
    },
    subCategory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubCategory",
        minLength: [1, "atleast one subCategories is required"],
    }],
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
    },
    ratingAverage: {
        type: Number,
        min: [1, "rating must be more than 0.0"],
        max: [5, "rating must be less than 5.0"],
    },
    ratingCount: {
        type: Number,
        default: 0,
        min: [0, "ratingCount must be more than 0"],
    },
    sold: {
        type: Number,
        default: 0,
    },
    priceAfterDiscount: {
        type: Number,
        default: 0,
    },
    quantity: {
        type: Number,
        default: 1,
        min: [0, "quantity must be more than 1"],
    },
    colors: {
        type: [String],
    }
}, { timestamps: true });

export const ProductModel = mongoose.model("Product", ProductSchema);

