import express from "express";

import { getAllProducts, getProductbyId } from "../../../controllers/frontend/ProductController.js";

const ProductRouter = express.Router(); // express.router is used to to define routes

ProductRouter.get('/', getAllProducts)
ProductRouter.get('/view/:id', getProductbyId)




export default ProductRouter;
