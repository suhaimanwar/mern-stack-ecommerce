import express from 'express'
import BrandRouter from './routes/BrandRoutes.js'
import CategoryRouter from './routes/CategoryRoutes.js'
import ProductRouter from './routes/ProductRoutes.js'

import BannerRouter from './routes/BannerRoutes.js'
import { adminAuthMiddleware } from '../../middleware/dashboard/adminAuthMiddleware.js'



const DashboardAuthRouter = express.Router()

DashboardAuthRouter.use(adminAuthMiddleware) 
//Calling the Auth Middleware on top automatically applies the middleware to everything in the bottom.

DashboardAuthRouter.use('/brands', BrandRouter)
DashboardAuthRouter.use('/categories', CategoryRouter)
DashboardAuthRouter.use('/products', ProductRouter)
DashboardAuthRouter.use('/banners', BannerRouter)


export default DashboardAuthRouter