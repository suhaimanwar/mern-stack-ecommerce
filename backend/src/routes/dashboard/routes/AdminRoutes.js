import express from "express";
import { createAdmin, loginAdmin, updatePassword } from "../../../controllers/dashboard/AdminController.js";
import { adminAuthMiddleware } from "../../../middleware/dashboard/adminAuthMiddleware.js";


const AdminRouter = express.Router()

AdminRouter.post("/create", createAdmin)
AdminRouter.post("/login", loginAdmin)
AdminRouter.post("/update", adminAuthMiddleware, updatePassword) //Token is required only for Update Password, as Create and login should be accessible for everyone

export default AdminRouter