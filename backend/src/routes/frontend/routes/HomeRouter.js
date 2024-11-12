import express from 'express'
import { getAllBanners, getFeaturedProducts, getHomeCategories } from '../../../controllers/frontend/HomeController.js'

const HomeRouter = express.Router()

HomeRouter.get('/categories', getHomeCategories)

HomeRouter.get('/featured', getFeaturedProducts)

HomeRouter.get('/banners', getAllBanners)

export default HomeRouter