import express from "express"
import { DashboardPublicRouter } from "./DashboardPublicRoutes.js"
import DashboardAuthRouter from "./DashboardAuthRoutes.js"

export const DashboardRouter = express.Router()

DashboardRouter.use(DashboardPublicRouter)
DashboardRouter.use(DashboardAuthRouter)