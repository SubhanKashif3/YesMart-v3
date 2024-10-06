import { Router } from "express";
import {register} from "../controllers/user"
const userRouter : Router = Router();

userRouter.post("/register",register)

export { userRouter }