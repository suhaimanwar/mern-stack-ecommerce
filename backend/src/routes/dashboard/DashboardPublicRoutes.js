
import express from "express"
import AdminRouter from "./routes/AdminRoutes.js"

export const DashboardPublicRouter = express.Router()

DashboardPublicRouter.use('/admin', AdminRouter)