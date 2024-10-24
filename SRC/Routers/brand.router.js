import {Router} from "express";

import {getBrandValidator, postBrandValidator,
     updateBrandValidator, deleteBrandValidator
} from "../Utillis/validators/brand.validator.js";

import {getBrandController, postBrandController,
     getBrandByIdController, updateSpecificBrandController,
     deleteBrandController} from "../Controllers/Brand.controller.js";

export const router = Router();

router.use("/:brandId/subBrands/", getBrandController)

router.route("/")
.get(getBrandController)
.post(postBrandValidator, postBrandController);

router.route("/:id/")
.get(getBrandValidator, getBrandByIdController)
.put(updateBrandValidator, updateSpecificBrandController)
.delete(deleteBrandValidator, deleteBrandController);