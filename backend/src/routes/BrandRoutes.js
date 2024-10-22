import express from "express";
import { createBrand, deleteBrand, getAllBrands, getBrandById, updateBrand } from "../controllers/BrandController.js";

const BrandRouter = express.Router(); // express.router is used to to define routes

BrandRouter.get('/', getAllBrands)
BrandRouter.post('/create', createBrand)
BrandRouter.get('/view/:id', getBrandById)
BrandRouter.delete('/delete/:id', deleteBrand)
BrandRouter.put('/update/:id', updateBrand)


export default BrandRouter;
