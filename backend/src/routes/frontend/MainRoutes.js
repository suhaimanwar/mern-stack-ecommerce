import express from 'express'
import CategoryRouter from './routes/CategoryRoutes.js'
import ProductRouter from './routes/ProductRoutes.js'

const FrontendRouter = express.Router()


FrontendRouter.use('/categories', CategoryRouter)
FrontendRouter.use('/products', ProductRouter)
 
export default FrontendRouter