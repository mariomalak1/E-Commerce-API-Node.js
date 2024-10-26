import "colors";
import fs from "fs";
import dotenv from "dotenv";
import {dbConnection} from "../../../DB/db_connection.js";
import {ProductModel} from "../../../DB/models/product.model.js";
import {CategoryModel} from "../../../DB/models/Category.model.js";
import SubCategoryModel from "../../../DB/models/SubCategory.model.js";
import {BrandModel} from "../../../DB/models/Brand.model.js";

dotenv.config({ path: '../../../config.env' });

// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));
const categories = await CategoryModel.find({});
const brands = await BrandModel.find({});

const putCategoryFromDBInProducts = async () => {
  let i = 0;
  let sepecifcCategory = null;

  for (const product of products) {
    i = Math.round(Math.random());
    sepecifcCategory = categories[i]._id;
    product.category = sepecifcCategory;
  }
}

const putSubCategoriesAndBrandInProducts = async () => {
  let i = 0;
  let sepecifcCategoryId = null;
  let subCategories = [];
  let subCategoriesArrayLen = 1;

  for (const product of products) {
    // select category
    sepecifcCategoryId = categories[i]._id;

    // get all subcategories of specific category
    subCategories = await SubCategoryModel.find({category: sepecifcCategoryId});

    // make random number of subcategories
    subCategoriesArrayLen = Math.random() * 4;

    // put subcategories in array
    for(let i = 0; i < subCategoriesArrayLen && i < subCategories.length; i++) {
      subCategories.push(subCategories[i]._id);
    }

    // assign subcategories to product
    product.subCategory = subCategories;

    // put brand
    product.brand = brands[i];
    i = Math.round(Math.random());
  }
}


// Insert data into DB
const insertProducts = async () => {
  try {
    await ProductModel.create(products);
    console.log('Data Inserted'.green.inverse);

  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log('Data Destroyed'.red.inverse);
  } catch (error) {
    console.log(error);
  }
};

// // node seeder.js -d
// if (process.argv[2] === '-i') {
//   insertData();
// } else if (process.argv[2] === '-d') {
//   destroyData();
// }

const saveAllDataOfProductsAndDelete = async () => {
  const deletedProducts = await ProductModel.find({});
  fs.writeFileSync('./deletedProducts.json', JSON.stringify(deletedProducts));
  destroyData();
}

const main = async () => {
  await destroyData();
  await putCategoryFromDBInProducts();
  await putSubCategoriesAndBrandInProducts();
  await insertProducts();
  console.log('Done');
  process.exit(0);
}

main();
