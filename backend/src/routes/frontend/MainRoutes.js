import express from 'express'
// import CategoryRouter from './routes/CategoryRoutes.js'
import ProductRouter from './routes/ProductRoutes.js'
import HomeRouter from './routes/HomeRouter.js'
import ShopRouter from './routes/ShopRouter.js'
import UserRouter from './routes/UserRoutes.js'

const FrontendRouter = express.Router()


// FrontendRouter.use('/categories', CategoryRouter)


FrontendRouter.use('/products', ProductRouter)
FrontendRouter.use('/home', HomeRouter)
FrontendRouter.use('/shop', ShopRouter)
FrontendRouter.use('/user', UserRouter)
 
export default FrontendRouter