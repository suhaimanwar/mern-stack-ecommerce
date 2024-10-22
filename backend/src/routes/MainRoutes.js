import express from 'express'
import BrandRouter from "./BrandRoutes.js"

const DashboardRouter = express.Router()

DashboardRouter.use('/brands', BrandRouter)
 
export default DashboardRouter