import express from "express";
import { createAdmin, loginAdmin, updatePassword } from "../../../controllers/dashboard/AdminController.js";


const AdminRouter = express.Router()

AdminRouter.post("/create", createAdmin)
AdminRouter.post("/login", loginAdmin)
AdminRouter.post("/update", updatePassword)

export default AdminRouter