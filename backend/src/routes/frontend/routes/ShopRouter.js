import express from 'express'
import { getAllCategories } from '../../../controllers/frontend/ShopController.js'
import { adminAuthMiddleware } from '../../../middleware/dashboard/adminAuthMiddleware.js'
import { userAuthMiddleware } from '../../../middleware/frontend/userAuthMiddleware.js'


const ShopRouter = express.Router()

ShopRouter.get('/categories', getAllCategories)

export default ShopRouter
