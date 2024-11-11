import express from "express"
import { createUser, loginUser } from "../../../controllers/frontend/UserController.js"

const UserRouter = express.Router()

UserRouter.post('/create', createUser)
UserRouter.post('/login', loginUser)

export default UserRouter