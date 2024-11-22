import mongoose from "mongoose";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError } from "../../utils/errorHandler.js";
import { BrandModel } from "../../models/BrandModel.js";

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
    const slug = req.params.id;
    const productData = await ProductModel.aggregate([
      {
        $match: {
          // _id: new mongoose.Types.ObjectId(productId),
          slug: slug,
          deletedAt: null,
        },
      },
      {
        $lookup: {
          from: BrandModel.modelName, //Importing BrandModel
          localField: "brand", //Specification on which field the ID is stored (this controller) 
          foreignField: "_id", // _id in the BrandModel - has to be the same
          as: "brandName",// at what Name
          pipeline: [ //To add condition
            {
              $match: { deletedAt: null },
            },
            { $project: { name: 1 } }, // Just project the name from the model
          ],
        },
      },
      {$unwind: "$brandName"},    //to remove the aggregate array
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          brand: 1,
          brandName: '$brandName.name', //assigning name onto brandName
        },
      },
    ]);

    // console.log("Name",productData.at(0))

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
    const slug = req.params.id;

    const productData = await ProductModel.aggregate([
      {
        $match: {
          category: slug,
          deletedAt: null,
        },
      },
      {
        $project: {
          name: 1,
          description: 1,
          image: 1,
          price: 1,
          slug: 1
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
