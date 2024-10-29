import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategorybyId, updateCategory } from "../controllers/CategoryController.js";
import { uploadImageFile } from "../utils/fileUploader.js";


const CategoryRouter = express.Router(); // express.router is used to to define routes

CategoryRouter.get('/', getAllCategories)
CategoryRouter.post('/create', uploadImageFile('categories').single('attachedFile'), createCategory)
CategoryRouter.get('/view/:id', getCategorybyId)
CategoryRouter.delete('/delete/:id', deleteCategory)
CategoryRouter.put('/update/:id', updateCategory)


export default CategoryRouter;
