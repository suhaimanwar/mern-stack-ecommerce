import express from 'express'
import BrandRouter from "./BrandRoutes.js"
import CategoryRouter from './CategoryRoutes.js'
import ProductRouter from './ProductRoutes.js'

const DashboardRouter = express.Router()

DashboardRouter.use('/brands', BrandRouter)
DashboardRouter.use('/categories', CategoryRouter)
DashboardRouter.use('/products', ProductRouter)
 
export default DashboardRouter