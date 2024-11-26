import { CategoryModel } from "../../models/CategoryModel.js";
import { ProductModel } from "../../models/ProductModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";
import { singleFileRemover } from "../../utils/fileRemover.js";
import { createSlug } from "../../utils/slug.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body; //Destructuring name and description from req.body (aka from the model)

    //   console.log('reqfileee',req.file)

    const categoryImage = getFilePath(req.file);

    await CategoryModel.create({
      name: name, //Placing the input name Here
      description: description, //Placing the nput description here.
      image: categoryImage,
      slug: await createSlug(name, CategoryModel),
      deletedAt: null,
    });

    return res.status(200).json({
      // If the data is send as a response successfully, this message should be displayed.
      success: true,
      message: "Category Created Successfully",
    });
  } catch (error) {
    return next(serverError(error)); //The error will be logged here. serverError is from errorHandler.
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await CategoryModel.find({ deletedAt: null });

    return res.status(200).json({
      success: true,
      message: "Categories Fetched Successfully",
      data: { categories: categories },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const getCategorybyId = async (req, res, next) => {
  try {
    // const categoryId = req.params.id;
    const categorySlug = req.params.id;
    // console.log("catSLug::",categorySlug)
    const categoryData = await CategoryModel.findOne({
      slug: categorySlug,
      deletedAt: null,
    });

    if (!categoryData) {
      return next(validationError("Category not found!"));
    }

    return res.status(200).json({
      success: true,
      message: "Category Fetched Successfully",
      data: { category: categoryData },
    });
  } catch (error) {
    return next(serverError(error));
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const categoryToDelete = await CategoryModel.findOne({ _id: categoryId });

    categoryToDelete.deletedAt = new Date();
    singleFileRemover(categoryToDelete.image);
    categoryToDelete.save();

    return res.status(200).json({
      success: true,
      message: "Category Deleted Successfully",
    });
  } catch (error) {
    next(serverError(error));
  }
};

// export const updateCategory = async (req, res, next) => {
//   try {
//     const categoryId = req.params.id;

//     const { name, description } = req.body;
//     // console.log('RRRRRRRREqqqq',req.body)

//     const category = await CategoryModel.findOne({
//       _id: categoryId,
//       deletedAt: null,
//     });

//     category.name = name;

//     category.description = description;
//     category.slug = await createSlug(name, CategoryModel);

//     if (req.file != null) {
//       singleFileRemover(category.image);
//       const categoryImage = getFilePath(req.file);
//       category.image = categoryImage;
//     }

//     await category.save();

//     return res.status(200).json({
//       success: true,
//       message: "Category Updated Successfully",
//     });
//   } catch (error) {
//     return next(serverError(error));
//   }
// };

export const updateCategory = async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const { name, description } = req.body;
  
      // Fetch the category to be updated
      const category = await CategoryModel.findOne({
        _id: categoryId,
        deletedAt: null,
      });
  
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
        });
      }
  
      // Store the old slug before updating
      const oldSlug = category.slug;
  
      // Update category details
      category.name = name;
      category.description = description;
      category.slug = await createSlug(name, CategoryModel);
  
      // Update the image if a new file is provided
      if (req.file != null) {
        singleFileRemover(category.image); // Remove old image
        const categoryImage = getFilePath(req.file); // Get new image path
        category.image = categoryImage;
      }
  
      await category.save();
      
      
      // update the products using the old slug
      await ProductModel.updateMany(
        { category: oldSlug }, // find products with the old slug
        { category: category.slug } // update them to the new slug
      );
  
      return res.status(200).json({
        success: true,
        message: "Category and related products updated successfully",
      });
    } catch (error) {
      return next(serverError(error)); // Handle errors
    }
  };
  
