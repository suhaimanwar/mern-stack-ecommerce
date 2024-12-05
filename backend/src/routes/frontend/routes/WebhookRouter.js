import express from 'express'
import { createWebHook } from '../../../webhook/PaymentWebhook.js'


const WebhookRouter = express.Router()

WebhookRouter.post('/stripe', createWebHook)

export default WebhookRouter