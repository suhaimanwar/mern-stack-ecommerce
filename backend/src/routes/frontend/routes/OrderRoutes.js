import express from 'express'
import { Order } from '../../../controllers/frontend/OrderController.js'
import { userAuthMiddleware } from '../../../middleware/frontend/userAuthMiddleware.js'

const OrderRouter = express.Router()

OrderRouter.post('/',userAuthMiddleware,  Order)

export default OrderRouter