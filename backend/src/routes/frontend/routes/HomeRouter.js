import express from 'express'
import { getFeaturedProducts, getHomeCategories } from '../../../controllers/frontend/HomeController.js'

const HomeRouter = express.Router()

HomeRouter.get('/categories', getHomeCategories)

HomeRouter.get('/featured', getFeaturedProducts)

export default HomeRouter