import mongoose from "mongoose";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError } from "../../utils/errorHandler.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const product = await ProductModel.aggregate([
      //pipeline - array bracket
      {
        $match: {
          // _id: new mongoose.Types.ObjectId(categoryId), // - Get by ID
          deletedAt: null, //Matches the deletedAt: null datas.
        },
      },
      {
        $sort: {
          createdAt: -1, //Descending Order, 1 is ascending
        },
      },
      {
        $project: {
          // _id: 0,
          name: 1,
          description: 1,
          image: 1,
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: { product: product },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getProductbyId = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const productData = await ProductModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(productId),
          deletedAt: null,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

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

export const getProductsbyCategory = async function (req, res, next) {
  try {
    const categoryId = req.params.id;
    const productData = await ProductModel.aggregate([
      {
        $match: {
          category: new mongoose.Types.ObjectId(categoryId),
          deletedAt: null,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);

    if (!productData) {
      return next(validationError("Product not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Products Fetched Successfully",
      data: { product: productData },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

// export const getFeaturedProducts = async function (req, res, next) {
//   try {
//     const products = await ProductModel.aggregate([
//       {
//         $match: {
//           featured: true,
//           deletedAt: null,
//         },
//       },
//       {
//         $project: {
//           name: 1,
//           description: 1,
//           image: 1,
//           price: 1,
//         },
//       },
//     ]);

//     if (!products) {
//       return next(validationError("Featured Products not found!"));
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Featured Products Fetched Successfully",
//       data: { products: products },
//     });
//   } catch (error) {
//     return next(serverError(error));
//   }
// };
