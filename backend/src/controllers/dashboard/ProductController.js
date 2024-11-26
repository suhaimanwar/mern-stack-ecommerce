import { CategoryModel } from "../../models/CategoryModel.js";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";
import { singleFileRemover } from "../../utils/fileRemover.js";
import { createSlug } from "../../utils/slug.js";

export const createProduct = async (req, res, next) => {
  try {
    const { name, description, brand, category, price } = req.body; //Destructuring name and description from req.body (aka from the model)

    const productImage = getFilePath(req.file);

    await ProductModel.create({
      name: name, //Placing the input name Here
      description: description, //Placing the nput description here.
      price: price,
      brand: brand,
      category: category,
      image: productImage,
      slug: await createSlug(name,ProductModel),
      deletedAt: null,
    });

    return res.status(200).json({
      // If the data is send as a response successfully, this message should be displayed.
      success: true,
      message: "Product Created Successfully",
    });
  } catch (error) {
    return next(serverError(error)); //The error will be logged here. serverError is from errorHandler.
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await ProductModel.find({ deletedAt: null });

    return res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: { products: products },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getProductbyId = async (req, res, next) => {
  try {
    const slug = req.params.id;
    const productData = await ProductModel.findOne({
      slug: slug,
      deletedAt: null,
    });

    if (!productData) {
      return next(validationError("Product not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Product Fetched Successfully",
      data: { product: productData },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const productToDelete = await ProductModel.findOne({ _id: productId });

    productToDelete.deletedAt = new Date();

    singleFileRemover(productToDelete.image);

    productToDelete.save();

    return res.status(200).json({
      success: true,
      message: "Product Deleted Successfully",
    });
  } catch (error) {
    next(serverError(error));
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const { name, description, brand, category, price } = req.body;

    const product = await ProductModel.findOne({
      _id: productId,
      deletedAt: null,
    });

    if (req.file != null) {
      singleFileRemover(product.image);
      const productImage = getFilePath(req.file);
      product.image = productImage;
    }

    product.name = name;
    product.description = description;
    product.brand = brand;
    product.category = category ;
    product.price = price;
    product.slug = await createSlug(name,ProductModel);


    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product Updated Successfully",
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const featured = async function (req, res, next) {
  try {
    const productId = req.params.id;

    const product = await ProductModel.findOne({
      deletedAt: null,
      _id: productId,
    });

    if (!product) {
      res.status(422).json({
        success: false,
        message: "Product not found",
      });
    }

    product.featured = product.featured ? false : true;
    //if product.featured is true then turn it to false
    //else should be true

    await product.save();

    res.status(200).json({
      success: true,
      message: "Updated Succesfully",
      data: product.featured,
    });
  } catch (error) {
    next(serverError(error));
  }
};
