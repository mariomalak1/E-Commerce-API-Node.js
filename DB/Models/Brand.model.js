import "mongoose";
import mongoose from "mongoose";

const BrandSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "name must be unique"],
        minLength: [2, "name length is to short"],
        maxLength: [36, "name length is to long"]
    },
    slug:{
        type: String,
        lowercase: true
    },
    image: String
}, {timestamps: true});


export const BrandModel = mongoose.model("Brand", BrandSchema);