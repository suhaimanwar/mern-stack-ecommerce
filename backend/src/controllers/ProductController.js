import { ProductModel } from "../models/ProductModel.js";
import { serverError, validationError } from "../utils/errorHandler.js";

export const createProduct = async (req, res, next) => {
    try {
      const { name, description } = req.body; //Destructuring name and description from req.body (aka from the model)
  
      await ProductModel.create({
        name: name, //Placing the input name Here
        description: description, //Placing the nput description here.
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
        const products = await ProductModel.find({deletedAt: null})

        return res.status(200).json({
            success:true,
            message: "Products Fetched Successfully",
            data: {products : products}
        })
    } catch (error) {
        return next(serverError(error))
    }
}

export const getProductbyId = async (req, res, next) => {
    try {
        const productId = req.params.id;
        const productData = await ProductModel.findOne({_id: productId, deletedAt:null})

        if (!productData) {
            return next(validationError("Product not found!"));
          }

        return res.status(200).json({
            success: true,
            message: 'Product Fetched Successfully',
            data: {product: productData}
        })
        
    } catch (error) {
       return next(serverError(error))
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id;
        
        const productToDelete = await ProductModel.findOne({_id: productId})

        productToDelete.deletedAt = new Date()

        productToDelete.save()

        return res.status(200).json({
            success: true,
            message: 'Product Deleted Successfully'
        })

     } catch (error) {
        next(serverError(error))
    }
}



export const updateProduct = async (req, res, next) => {

    try {
        const productId = req.params.id;

        const {name, description} = req.body

        const product = await ProductModel.findOne({_id: productId, deletedAt:null})

        product.name= name;

        product.description = description;

        await product.save()

        return res.status(200).json({
            success: true,
            message: "Product Updated Successfully"
        })
        
    } catch (error) {
        return next(serverError(error))
    }
    
}

