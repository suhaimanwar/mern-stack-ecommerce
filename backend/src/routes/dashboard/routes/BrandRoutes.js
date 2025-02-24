import express from "express";
import {
  createBrand,
  deleteBrand,
  getAllBrands,
  getBrandById,
  getBrandsDropdown,
  updateBrand,
} from "../../../controllers/dashboard/BrandController.js";
import { uploadImageFile } from "../../../utils/fileUploader.js";

const BrandRouter = express.Router(); // express.router is used to to define routes

BrandRouter.get("/", getAllBrands);
BrandRouter.get("/dropdown", getBrandsDropdown);
BrandRouter.post("/create", uploadImageFile('brands').single('attachedFile'), createBrand); //We are calling the middleware in between - fileUploader.js, middleware runs in the middle. In this case, we are creating the folders before getting the data, we're sorting it out.
BrandRouter.get("/view/:id", getBrandById);
BrandRouter.delete("/delete/:id", deleteBrand);
BrandRouter.put("/update/:id",uploadImageFile('brands').single('attachedFile'), updateBrand); 

export default BrandRouter;
