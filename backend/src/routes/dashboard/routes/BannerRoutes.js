import express from "express";

import { createBanner, deleteBanner, getAllBanners, getBannerbyId, updateBanner } from "../../../controllers/dashboard/BannerController.js"
import { uploadImageFile } from "../../../utils/fileUploader.js";


const BannerRouter = express.Router()

BannerRouter.post("/create",uploadImageFile('banners').single('attachedFile'), createBanner)
BannerRouter.get("/", getAllBanners)
BannerRouter.get("/view/:id", getBannerbyId)
BannerRouter.delete("/delete/:id", deleteBanner)
BannerRouter.put("/update/:id",uploadImageFile('banners').single('attachedFile'), updateBanner)
// BannerRouter.get("/", getAllBanners)


export default BannerRouter