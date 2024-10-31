import express from 'express'
import BrandRouter from './routes/BrandRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import ProductRouter from './routes/ProductRoutes.js'



const DashboardRouter = express.Router()

DashboardRouter.use('/brands', BrandRouter)
DashboardRouter.use('/categories', CategoryRouter)
DashboardRouter.use('/products', ProductRouter)
 
export default DashboardRouter