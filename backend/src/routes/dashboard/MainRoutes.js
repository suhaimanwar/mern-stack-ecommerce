import express from 'express'
import BrandRouter from './routes/BrandRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import ProductRouter from './routes/ProductRoutes.js'
import AdminRouter from './routes/AdminRoutes.js'



const DashboardRouter = express.Router()

DashboardRouter.use('/brands', BrandRouter)
DashboardRouter.use('/categories', CategoryRouter)
DashboardRouter.use('/products', ProductRouter)
DashboardRouter.use('/admin', AdminRouter)
 
export default DashboardRouter