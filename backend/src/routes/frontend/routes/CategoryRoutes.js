import express from "express";
import { getAllCategories, getCategoryName } from "../../../controllers/frontend/CategoryController.js";

const CategoryRouter = express.Router(); // express.router is used to to define routes

CategoryRouter.get('/', getAllCategories)

CategoryRouter.get('/name', getCategoryName)



export default CategoryRouter;
