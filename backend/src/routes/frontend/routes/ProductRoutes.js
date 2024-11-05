import express from "express";

import { getAllProducts, getProductbyId, getProductsbyCategory } from "../../../controllers/frontend/ProductController.js";

const ProductRouter = express.Router(); // express.router is used to to define routes

ProductRouter.get('/', getAllProducts)
ProductRouter.get('/view/:id', getProductbyId)
ProductRouter.get('/categories/:id', getProductsbyCategory)

export default ProductRouter;
