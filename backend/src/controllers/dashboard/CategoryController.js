import { CategoryModel } from "../../models/CategoryModel.js";
import { serverError, validationError } from "../../utils/errorHandler.js";
import { getFilePath } from "../../utils/filePath.js";

export const createCategory = async (req, res, next) => {
    try {
      const { name, description } = req.body; //Destructuring name and description from req.body (aka from the model)

    //   console.log('reqfileee',req.file)

    const categoryImage = getFilePath(req.file)
  
      await CategoryModel.create({
        name: name, //Placing the input name Here
        description: description, //Placing the nput description here.
        image: categoryImage,
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
        const categories = await CategoryModel.find({deletedAt: null})

        return res.status(200).json({
            success:true,
            message: "Categories Fetched Successfully",
            data: {categories : categories}
        })
    } catch (error) {
        return next(serverError(error))
    }
}

export const getCategorybyId = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        const categoryData = await CategoryModel.findOne({_id: categoryId, deletedAt:null})

        if (!categoryData) {
            return next(validationError("Category not found!"));
          }

        return res.status(200).json({
            success: true,
            message: 'Category Fetched Successfully',
            data: {category: categoryData}
        })
        
    } catch (error) {
       return next(serverError(error))
    }
}


export const deleteCategory = async (req, res, next) => {
    try {
        const categoryId = req.params.id;
        
        const categoryToDelete = await CategoryModel.findOne({_id: categoryId})

        categoryToDelete.deletedAt = new Date()

        categoryToDelete.save()

        return res.status(200).json({
            success: true,
            message: 'Category Deleted Successfully'
        })

     } catch (error) {
        next(serverError(error))
    }
}

export const updateCategory = async (req, res, next) => {

    try {
        const categoryId = req.params.id;

        const {name, description} = req.body
        
        console.log('RRRRRRRREqqqq',req.body)

        

        const category = await CategoryModel.findOne({_id: categoryId, deletedAt:null})

       
        category.name= name;

        category.description = description;

        

        if (req.file !=null) {
            const categoryImage = getFilePath(req.file)
            category.image = categoryImage
          }


        await category.save()

        return res.status(200).json({
            success: true,
            message: "Category Updated Successfully"
        })
        
    } catch (error) {
        return next(serverError(error))
    }
    
}