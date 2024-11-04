import express from 'express'
import { getAllCategories } from '../../../controllers/frontend/ShopController.js'


const ShopRouter = express.Router()

ShopRouter.get('/categories', getAllCategories)

export default ShopRouter
