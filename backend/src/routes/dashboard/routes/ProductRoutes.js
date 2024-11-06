import express from "express";
import { createProduct, deleteProduct, featured, getAllProducts, getProductbyId, updateProduct } from "../../../controllers/dashboard/ProductController.js";
import { uploadImageFile } from "../../../utils/fileUploader.js";


const ProductRouter = express.Router(); // express.router is used to to define routes

ProductRouter.get('/', getAllProducts)
ProductRouter.post('/create',  uploadImageFile('products').single('attachedFile'), createProduct)
ProductRouter.get('/view/:id', getProductbyId)
ProductRouter.delete('/delete/:id', deleteProduct)
ProductRouter.put('/update/:id', uploadImageFile('products').single('attachedFile'), updateProduct)

ProductRouter.put('/featured/:id', featured)


export default ProductRouter;
