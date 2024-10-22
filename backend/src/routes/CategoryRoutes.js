import express from "express";
import { createCategory, deleteCategory, getAllCategories, getCategorybyId, updateCategory } from "../controllers/CategoryController.js";


const CategoryRouter = express.Router(); // express.router is used to to define routes

CategoryRouter.get('/', getAllCategories)
CategoryRouter.post('/create', createCategory)
CategoryRouter.get('/view/:id', getCategorybyId)
CategoryRouter.delete('/delete/:id', deleteCategory)
CategoryRouter.put('/update/:id', updateCategory)


export default CategoryRouter;
