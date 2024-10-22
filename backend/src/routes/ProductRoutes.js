import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductbyId, updateProduct } from "../controllers/ProductController.js";


const ProductRouter = express.Router(); // express.router is used to to define routes

ProductRouter.get('/', getAllProducts)
ProductRouter.post('/create', createProduct)
ProductRouter.get('/view/:id', getProductbyId)
ProductRouter.delete('/delete/:id', deleteProduct)
ProductRouter.put('/update/:id', updateProduct)


export default ProductRouter;
