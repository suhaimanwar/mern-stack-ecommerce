import express from 'express'
import { Order, payment } from '../../../controllers/frontend/OrderController.js'
import { userAuthMiddleware } from '../../../middleware/frontend/userAuthMiddleware.js'

const OrderRouter = express.Router()

OrderRouter.post('/',userAuthMiddleware,  Order)
OrderRouter.get('/',  payment)

export default OrderRouter